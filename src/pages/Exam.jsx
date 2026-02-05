import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(7200); // 2 horas fixas em segundos (2 * 3600)
    const [isBlocked, setIsBlocked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (forced = false) => {
        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;
        setSubmitting(true);
        try {
            await api.submitExam(answers);
            navigate('/');
        } catch (e) {
            isSubmittingRef.current = false;
            setSubmitting(false);
            alert('Erro ao enviar: ' + e.message);
        }
    }, [answers, navigate]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await api.startExam();
                if (data.status === 'submitted') {
                    alert('Você já enviou esta prova.');
                    navigate('/');
                    return;
                }
                setQuestions(data.questions);
            } catch (e) {
                alert(e.message || 'Erro ao carregar questões');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [navigate]);

    useEffect(() => {
        const handleSecurity = () => {
            if (isSubmittingRef.current) return;
            setIsBlocked(true);
            api.logCheat('User tried to switch tab or leave fullscreen');
        };

        const timer = setInterval(() => {
            if (isSubmittingRef.current) return;
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        window.addEventListener('blur', handleSecurity);
        window.addEventListener('visibilitychange', () => {
            if (document.hidden) handleSecurity();
        });

        return () => {
            clearInterval(timer);
            window.removeEventListener('blur', handleSecurity);
        };
    }, [handleSubmit]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (qId, option) => {
        if (isBlocked) return;
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    if (loading) return (
        <div className="flex-center" style={{ height: '100vh' }}>
            <span className="loader" style={{ width: '40px', height: '40px', borderTopColor: 'var(--primary)' }}></span>
        </div>
    );

    if (isBlocked) return (
        <div className="flex-center" style={{ height: '100vh', padding: '1rem' }}>
            <Card style={{ maxWidth: '500px', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--error)', marginBottom: '1rem' }}>Acesso Suspenso</h2>
                <Alert type="error">
                    Foi detectada uma tentativa de troca de aba ou encerramento da janela.
                    Por motivos de segurança, sua prova foi bloqueada e a liderança notificada.
                </Alert>
                <Button onClick={() => navigate('/')} variant="outline" className="mt-4">Voltar ao Início</Button>
            </Card>
        </div>
    );

    const progress = Math.round((Object.keys(answers).length / questions.length) * 100) || 0;

    return (
        <div className="container" style={{ maxWidth: '850px', paddingBottom: '6rem' }}>
            <div style={{
                position: 'sticky',
                top: '1rem',
                zIndex: 100,
                marginBottom: '2rem'
            }}>
                <Card style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }} animate={false}>
                    <div className="flex-between wrap gap-4">
                        <div className="flex-col" style={{ flex: 1 }}>
                            <div className="flex-between mb-2">
                                <span className="text-sm font-bold text-secondary">Progresso: {progress}%</span>
                                <span className="text-sm font-bold text-secondary">{Object.keys(answers).length}/{questions.length} Respondidas</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    background: 'var(--success)',
                                    transition: 'width 0.5s ease'
                                }} />
                            </div>
                        </div>
                        <div className="text-center" style={{
                            minWidth: '100px',
                            background: timeLeft < 300 ? 'var(--error-soft)' : 'var(--primary-soft)',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${timeLeft < 300 ? 'var(--error)' : 'var(--primary)'}22`
                        }}>
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: timeLeft < 300 ? 'var(--error)' : 'var(--primary)',
                                fontFamily: 'monospace'
                            }}>
                                {formatTime(timeLeft)}
                            </div>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.7 }}>Restante</div>
                        </div>
                    </div>
                </Card>
            </div>

            <main className="flex-col gap-6">
                {questions.map((q, index) => (
                    <Card key={q.id} style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className="mb-6">
                            <span style={{
                                background: 'var(--primary-soft)',
                                color: 'var(--primary)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                marginBottom: '1rem',
                                display: 'inline-block'
                            }}>
                                QUESTÃO {index + 1}
                            </span>
                            <h3 style={{ lineHeight: '1.4', color: 'var(--text-main)' }}>{q.text}</h3>
                        </div>

                        <div className="flex-col gap-3">
                            {q.options.map((opt) => {
                                const isSelected = answers[q.id] === opt;
                                return (
                                    <label
                                        key={opt}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '1.25rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '2px solid',
                                            borderColor: isSelected ? 'var(--primary)' : 'var(--border-light)',
                                            background: isSelected ? 'var(--primary-soft)' : 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: isSelected ? '0 4px 12px -2px rgba(37, 99, 235, 0.1)' : 'none'
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name={`q-${q.id}`}
                                            checked={isSelected}
                                            onChange={() => handleAnswerSelect(q.id, opt)}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                accentColor: 'var(--primary)',
                                                marginRight: '1.25rem',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <span style={{
                                            fontSize: '1rem',
                                            fontWeight: isSelected ? '600' : '400',
                                            color: isSelected ? 'var(--primary-active)' : 'var(--text-secondary)'
                                        }}>
                                            {opt}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </Card>
                ))}

                <Button
                    onClick={() => handleSubmit()}
                    loading={submitting}
                    disabled={Object.keys(answers).length === 0}
                    style={{
                        padding: '1.5rem',
                        fontSize: '1.1rem',
                        marginTop: '2rem',
                        boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)'
                    }}
                >
                    Finalizar e Entregar Prova
                </Button>
            </main>
        </div>
    );
};

export default Exam;
