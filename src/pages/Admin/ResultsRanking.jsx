import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const ResultsRanking = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewingAnswers, setViewingAnswers] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loadingAnswers, setLoadingAnswers] = useState(false);

    const loadResults = async () => {
        try {
            const data = await api.admin.getResults();
            setResults(data);
        } finally { setLoading(false); }
    };

    useEffect(() => { loadResults(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Excluir este resultado? O usuário poderá fazer a prova novamente.')) return;
        await api.admin.deleteResult(id);
        loadResults();
    };

    const handleViewAnswers = async (attempt) => {
        setViewingAnswers(attempt);
        setLoadingAnswers(true);
        try {
            const data = await api.admin.getAttemptAnswers(attempt.attempt_id);
            setAnswers(data);
        } catch (e) {
            alert('Erro ao carregar respostas: ' + e.message);
        } finally {
            setLoadingAnswers(false);
        }
    };

    const closeModal = () => {
        setViewingAnswers(null);
        setAnswers([]);
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <>
            <div className="glass-card">
                <h2 className="mb-4 text-primary">Ranking de Resultados</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Nome</th>
                                <th>Congregação</th>
                                <th>Nota</th>
                                <th>Tempo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((r, idx) => (
                                <tr key={r.attempt_id}>
                                    <td style={{ fontWeight: 'bold' }}>#{idx + 1}</td>
                                    <td>{r.nome}</td>
                                    <td>{r.congregação}</td>
                                    <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                                        {r.score ? r.score : 0}
                                    </td>
                                    <td>{formatTime(r.duration_seconds)}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewAnswers(r)}
                                                className="btn btn-outline"
                                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', width: 'auto' }}
                                            >
                                                Ver Prova
                                            </button>
                                            <button
                                                onClick={() => handleDelete(r.attempt_id)}
                                                className="btn btn-danger"
                                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', width: 'auto' }}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for viewing answers */}
            {viewingAnswers && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: window.innerWidth > 768 ? '2rem' : '0'
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="glass-card"
                        style={{
                            maxWidth: '900px',
                            width: '100%',
                            height: window.innerWidth > 768 ? '90vh' : '100vh',
                            maxHeight: '100vh',
                            overflowY: 'auto',
                            position: 'relative',
                            borderRadius: window.innerWidth > 768 ? 'var(--radius)' : '0',
                            padding: 'var(--spacing-4)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ position: 'sticky', top: 0, background: 'white', paddingBottom: '1rem', borderBottom: '2px solid #E5E7EB', marginBottom: '1.5rem', zIndex: 10 }}>
                            <div className="flex-between wrap">
                                <div>
                                    <h2 className="m-0" style={{ color: 'var(--primary-dark)' }}>
                                        Prova de {viewingAnswers.nome}
                                    </h2>
                                    <p className="text-light m-0">
                                        Nota: <strong className="text-primary">{viewingAnswers.score}</strong> |
                                        Tempo: <strong>{formatTime(viewingAnswers.duration_seconds)}</strong>
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="btn btn-danger"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        padding: '0',
                                        borderRadius: '50%',
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {loadingAnswers ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>Carregando respostas...</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {answers.map((q, index) => (
                                    <div
                                        key={q.id}
                                        style={{
                                            padding: '1rem',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            background: q.user_answer_correct ? '#F0FDF4' : '#FEF2F2'
                                        }}
                                    >
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong style={{ color: 'var(--primary-dark)' }}>
                                                Questão {index + 1}:
                                            </strong>
                                            <p style={{ marginTop: '0.5rem' }}>{q.question_text}</p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {q.options.map((opt) => {
                                                const isSelected = opt.id === q.selected_option_id;
                                                const isCorrect = opt.is_correct;

                                                let bgColor = '#F9FAFB';
                                                let borderColor = '#E5E7EB';
                                                let textColor = '#374151';

                                                if (isSelected && isCorrect) {
                                                    bgColor = '#DCFCE7';
                                                    borderColor = '#22C55E';
                                                    textColor = '#166534';
                                                } else if (isSelected && !isCorrect) {
                                                    bgColor = '#FEE2E2';
                                                    borderColor = '#EF4444';
                                                    textColor = '#991B1B';
                                                } else if (!isSelected && isCorrect) {
                                                    bgColor = '#E0F2FE';
                                                    borderColor = '#0EA5E9';
                                                    textColor = '#075985';
                                                }

                                                return (
                                                    <div
                                                        key={opt.id}
                                                        style={{
                                                            padding: '0.75rem',
                                                            background: bgColor,
                                                            border: `2px solid ${borderColor}`,
                                                            borderRadius: '6px',
                                                            color: textColor,
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <span>{opt.option_text}</span>
                                                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                            {isSelected && <span>✓ ESCOLHIDA</span>}
                                                            {isCorrect && <span>✔ CORRETA</span>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                                            Resultado: {q.user_answer_correct ?
                                                <span style={{ color: '#22C55E' }}>✓ Acertou</span> :
                                                <span style={{ color: '#EF4444' }}>✗ Errou</span>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ResultsRanking;
