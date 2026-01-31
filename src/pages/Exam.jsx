import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Exam = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
    const [blocked, setBlocked] = useState(false);
    const [loading, setLoading] = useState(true);

    // Security & Initialization
    useEffect(() => {
        const initExam = async () => {
            try {
                const data = await api.startExam();
                if (data.status === 'submitted') {
                    navigate('/');
                    return;
                }
                setQuestions(data.questions || []);
            } catch (err) {
                alert("Erro ao carregar prova: " + err.message);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        initExam();

        // Anti-cheat Listeners
        const handleVisibilityChange = () => {
            if (document.hidden) triggerBlock("Saiu da aba/minimizou");
        };

        const handleBlur = () => {
            triggerBlock("Clicou fora da página");
        };

        // Prevent Context Menu
        const handleContextMenu = (e) => e.preventDefault();
        window.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('contextmenu', handleContextMenu);

        // Prevent refresh warning (standard browser behavior, can't strictly block refresh but can warn)
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [navigate]);

    // Timer
    useEffect(() => {
        if (blocked) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(true); // Auto submit on timeout
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [blocked]);

    const triggerBlock = (reason) => {
        setBlocked(true);
        api.blockUser(); // Inform backend
    };

    const handleAnswerSelect = (questionId, option) => {
        if (blocked) return;
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleSubmit = async (auto = false) => {
        if (blocked && !auto) return; // Can't submit if blocked manually, but timeout forces it? Actually if blocked user is locked out.

        try {
            if (!auto) {
                const confirmSubmit = window.confirm("Tem certeza que deseja enviar a prova?");
                if (!confirmSubmit) return;
            }

            await api.submitExam(answers);
            alert(blocked ? "Prova encerrada por violação de segurança." : "Prova enviada com sucesso!");
            navigate('/');
        } catch (err) {
            alert("Erro ao enviar: " + err.message);
        }
    };

    const formatTime = (seconds) => {

        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    };

    if (loading) return <div className="flex-center" style={{ height: '100vh' }}>Carregando prova...</div>;

    if (blocked) {

        return (
            <div className="flex-center" style={{ height: '100vh', background: '#FEF2F2' }}>
                <div className="glass-card text-center" style={{ borderColor: '#EF4444', animation: 'none' }}>
                    <h1 style={{ color: '#DC2626', marginBottom: '1rem' }}>PROVA ENCERRADA</h1>
                    <p style={{ color: '#7F1D1D', marginBottom: '2rem' }}>
                        Usuário bloqueado por violação das regras de segurança.
                        <br />
                        Por favor falar com os administradores.
                    </p>
                    <button onClick={() => navigate('/login')} className="btn" style={{ background: '#DC2626', color: 'white' }}>
                        Voltar ao Início
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Sticky Header with Timer */}
            <div className="glass-card" style={{
                position: 'sticky',
                top: '1rem',
                zIndex: 100,
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.98)',
                marginBottom: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'monospace', color: timeLeft < 300 ? '#DC2626' : 'var(--primary)' }}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
                {questions.map((q, index) => (
                    <div key={q.id} className="glass-card animate-fade-in" style={{ marginBottom: '1.5rem', animationDelay: `${index * 0.05}s` }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
                            {index + 1}. {q.text}
                        </h3>
                        <div className="flex-col gap-4">
                            {q.options.map((opt) => (
                                <label
                                    key={opt}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid',
                                        borderColor: answers[q.id] === opt ? 'var(--primary)' : '#E5E7EB',
                                        background: answers[q.id] === opt ? '#EFF6FF' : 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name={`q-${q.id}`}
                                        value={opt}
                                        checked={answers[q.id] === opt}
                                        onChange={() => handleAnswerSelect(q.id, opt)}
                                        style={{ marginRight: '1rem', accentColor: 'var(--primary)', transform: 'scale(1.2)' }}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="text-center mt-4">
                    <button
                        onClick={() => handleSubmit(false)}
                        className="btn btn-primary"
                        style={{ fontSize: '1.25rem', padding: '1rem 4rem' }}
                    >
                        Enviar Prova
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Exam;
