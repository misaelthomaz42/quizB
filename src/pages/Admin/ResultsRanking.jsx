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
                <h2 className="mb-4 text-blue">Ranking de Resultados</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F3F4F6', textAlign: 'left' }}>
                                <th className="p-2">Pos</th>
                                <th className="p-2">Nome</th>
                                <th className="p-2">Congregação</th>
                                <th className="p-2">Nota</th>
                                <th className="p-2">Tempo</th>
                                <th className="p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((r, idx) => (
                                <tr key={r.attempt_id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                    <td className="p-2 font-bold">#{idx + 1}</td>
                                    <td className="p-2">{r.nome}</td>
                                    <td className="p-2">{r.congregação}</td>
                                    <td className="p-2" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                                        {r.score ? r.score : 0}
                                    </td>
                                    <td className="p-2">{formatTime(r.duration_seconds)}</td>
                                    <td className="p-2" style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleViewAnswers(r)}
                                            style={{
                                                color: '#2563EB',
                                                border: '1px solid #2563EB',
                                                background: 'none',
                                                cursor: 'pointer',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            Ver Prova
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r.attempt_id)}
                                            style={{
                                                color: 'red',
                                                border: 'none',
                                                background: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Excluir
                                        </button>
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
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '2rem'
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="glass-card"
                        style={{
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ position: 'sticky', top: 0, background: 'white', paddingBottom: '1rem', borderBottom: '2px solid #E5E7EB', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                                        Prova de {viewingAnswers.nome}
                                    </h2>
                                    <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                                        Nota: <strong style={{ color: 'var(--primary)' }}>{viewingAnswers.score}</strong> |
                                        Tempo: <strong>{formatTime(viewingAnswers.duration_seconds)}</strong>
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    style={{
                                        background: '#EF4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '2rem',
                                        height: '2rem',
                                        cursor: 'pointer',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold'
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
