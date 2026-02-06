import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Review = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Check if results are released
                const status = await api.getExamStatus();
                const user = api.getCurrentUser();

                if (!status.resultsReleased && !user?.is_admin) {
                    alert('Os resultados ainda não foram liberados pelo administrador.');
                    navigate('/');
                    return;
                }

                const data = await api.getUserResults();
                setResults(data);
            } catch (e) {
                console.error(e);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [navigate]);

    if (loading) return (
        <div className="flex-center" style={{ height: '100vh' }}>
            <span className="loader" style={{ width: '40px', height: '40px', borderTopColor: 'var(--primary)' }}></span>
        </div>
    );

    return (
        <div className="container" style={{ maxWidth: '850px', paddingBottom: '6rem' }}>
            <header className="flex-between mb-8 mt-8">
                <div>
                    <h1 style={{ fontSize: '1.75rem', color: 'var(--text-main)' }}>Revisão da Prova</h1>
                    <p className="text-secondary">Confira as respostas que você marcou</p>
                </div>
                <Button onClick={() => navigate('/')} variant="outline">Voltar ao Início</Button>
            </header>

            <main className="flex-col gap-6">
                {results.map((q, index) => {
                    const selectedOpt = q.options.find(o => o.id === q.selected_option_id);
                    const isCorrect = selectedOpt?.is_correct;

                    return (
                        <Card key={q.id}>
                            <div className="mb-4">
                                <span style={{
                                    background: isCorrect ? 'var(--success-soft)' : 'var(--error-soft)',
                                    color: isCorrect ? 'var(--success)' : 'var(--error)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem',
                                    display: 'inline-block'
                                }}>
                                    QUESTÃO {index + 1} • {isCorrect ? 'VOCÊ ACERTOU ✓' : 'VOCÊ ERROU ✗'}
                                </span>
                                <h3 style={{ lineHeight: '1.4', color: 'var(--text-main)' }}>{q.question_text}</h3>
                            </div>

                            <div className="flex-col gap-2">
                                {q.options.map((opt) => {
                                    const isUserSelected = q.selected_option_id === opt.id;
                                    const shouldHighlight = opt.is_correct || isUserSelected;

                                    let borderColor = 'var(--border-light)';
                                    let bg = 'white';
                                    let color = 'var(--text-secondary)';

                                    if (opt.is_correct) {
                                        borderColor = 'var(--success)';
                                        bg = 'var(--success-soft)';
                                        color = 'var(--success)';
                                    }

                                    if (isUserSelected && !opt.is_correct) {
                                        borderColor = 'var(--error)';
                                        bg = 'var(--error-soft)';
                                        color = 'var(--error)';
                                    }

                                    return (
                                        <div
                                            key={opt.id}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '2px solid',
                                                borderColor: borderColor,
                                                background: bg,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem'
                                            }}
                                        >
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                border: `2px solid ${borderColor}`,
                                                background: isUserSelected ? borderColor : 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '0.6rem'
                                            }}>
                                                {isUserSelected && '✓'}
                                            </div>
                                            <span style={{ fontWeight: shouldHighlight ? '600' : '400', color: color }}>
                                                {opt.option_text}
                                                {Boolean(opt.is_correct) ? <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>(Resposta Correta)</span> : null}
                                                {(isUserSelected && !opt.is_correct) ? <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>(Sua Escolha)</span> : null}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    );
                })}
            </main>
        </div>
    );
};

export default Review;
