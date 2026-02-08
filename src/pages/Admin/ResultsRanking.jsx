import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

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
            alert('Erro ao carregar: ' + e.message);
        } finally {
            setLoadingAnswers(false);
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (loading) return (
        <div className="flex-center" style={{ padding: '3rem' }}>
            <span className="loader" style={{ width: '32px', height: '32px', borderTopColor: 'var(--primary)' }}></span>
        </div>
    );

    return (
        <div className="flex-col gap-6">
            <Card>
                <div className="flex-between wrap mb-6">
                    <h3 className="text-primary">🏆 Ranking de Resultados</h3>
                    <Button onClick={loadResults} variant="outline" style={{ width: 'auto', fontSize: '0.8rem' }}>Atualizar</Button>
                </div>

                {/* Ranking Área 12 */}
                <div className="mb-8">
                    <h4 className="text-secondary mb-4" style={{ borderBottom: '2px solid var(--secondary)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                        Área 12
                    </h4>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pos</th>
                                    <th>Nome</th>
                                    <th>Congregação</th>
                                    <th>Área</th>
                                    <th>Nota</th>
                                    <th>Tempo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.filter(r => r.setor == '12').map((r, idx) => (
                                    <tr key={r.attempt_id}>
                                        <td style={{ fontWeight: '800', color: idx < 3 ? 'var(--warning)' : 'inherit' }}>
                                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{r.nome}</div>
                                        </td>
                                        <td>{r.congregacao || '-'}</td>
                                        <td>Area {r.setor || '-'}</td>
                                        <td>
                                            <span style={{
                                                background: 'var(--primary-soft)',
                                                color: 'var(--primary)',
                                                padding: '0.25rem 0.6rem',
                                                borderRadius: '20px',
                                                fontWeight: '800'
                                            }}>
                                                {r.score || 0}
                                            </span>
                                        </td>
                                        <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{formatTime(r.duration_seconds)}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Button onClick={() => handleViewAnswers(r)} variant="outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}>
                                                    Ver Prova
                                                </Button>
                                                <Button onClick={() => handleDelete(r.attempt_id)} variant="danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}>
                                                    Excluir
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {results.filter(r => r.setor == '12').length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                            Nenhum resultado para Área 12
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ranking Área 32 */}
                <div>
                    <h4 className="text-secondary mb-4" style={{ borderBottom: '2px solid var(--secondary)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                        Área 32
                    </h4>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pos</th>
                                    <th>Nome</th>
                                    <th>Congregação</th>
                                    <th>Área</th>
                                    <th>Nota</th>
                                    <th>Tempo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.filter(r => r.setor == '32').map((r, idx) => (
                                    <tr key={r.attempt_id}>
                                        <td style={{ fontWeight: '800', color: idx < 3 ? 'var(--warning)' : 'inherit' }}>
                                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{r.nome}</div>
                                        </td>
                                        <td>{r.congregacao || '-'}</td>
                                        <td>Area {r.setor || '-'}</td>
                                        <td>
                                            <span style={{
                                                background: 'var(--primary-soft)',
                                                color: 'var(--primary)',
                                                padding: '0.25rem 0.6rem',
                                                borderRadius: '20px',
                                                fontWeight: '800'
                                            }}>
                                                {r.score || 0}
                                            </span>
                                        </td>
                                        <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{formatTime(r.duration_seconds)}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Button onClick={() => handleViewAnswers(r)} variant="outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}>
                                                    Ver Prova
                                                </Button>
                                                <Button onClick={() => handleDelete(r.attempt_id)} variant="danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}>
                                                    Excluir
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {results.filter(r => r.setor == '32').length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                            Nenhum resultado para Área 32
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>

            {viewingAnswers && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem'
                }} onClick={() => setViewingAnswers(null)}>
                    <Card
                        style={{ maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '0' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ position: 'sticky', top: 0, background: 'white', padding: '1.5rem', borderBottom: '1px solid var(--border-light)', zIndex: 10 }}>
                            <div className="flex-between wrap">
                                <div>
                                    <h2 className="m-0" style={{ fontSize: '1.25rem' }}>Prova: {viewingAnswers.nome}</h2>
                                    <p className="text-light text-sm">Nota: <strong>{viewingAnswers.score}</strong> | Tempo: {formatTime(viewingAnswers.duration_seconds)}</p>
                                </div>
                                <Button onClick={() => setViewingAnswers(null)} variant="danger" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>✕</Button>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem' }} className="flex-col gap-6">
                            {loadingAnswers ? (
                                <div className="flex-center" style={{ padding: '2rem' }}><span className="loader" style={{ borderTopColor: 'var(--primary)' }}></span></div>
                            ) : (
                                answers.map((q, i) => (
                                    <div key={i} style={{ paddingBottom: '1.5rem', borderBottom: i < answers.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                                        <p style={{ fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>{i + 1}. {q.question_text}</p>
                                        <div className="flex-col gap-2">
                                            {q.options.map((opt, idx) => {
                                                const isSelected = opt.id === q.selected_option_id;
                                                const isCorrect = opt.is_correct;
                                                return (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            padding: '0.75rem 1rem',
                                                            borderRadius: 'var(--radius-sm)',
                                                            border: '1px solid',
                                                            fontSize: '0.9rem',
                                                            background: isSelected ? (isCorrect ? 'var(--success-soft)' : 'var(--error-soft)') : (isCorrect ? 'var(--primary-soft)' : 'white'),
                                                            borderColor: isSelected ? (isCorrect ? 'var(--success)' : 'var(--error)') : (isCorrect ? 'var(--primary)' : 'var(--border-light)'),
                                                            color: isSelected ? (isCorrect ? 'var(--success)' : 'var(--error)') : (isCorrect ? 'var(--primary)' : 'var(--text-secondary)'),
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            fontWeight: (isSelected || isCorrect) ? '700' : '400'
                                                        }}
                                                    >
                                                        <span>{opt.option_text}</span>
                                                        <span style={{ fontSize: '0.7rem' }}>
                                                            {isSelected && 'ESCOLHIDA'}
                                                            {isCorrect && ' | CORRETA ✓'}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ResultsRanking;
