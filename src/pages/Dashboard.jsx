import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [examStatus, setExamStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const status = await api.getExamStatus();
                // Store the full status object to access correct/wrong/duration info
                setExamStatus({
                    totalQuestions: 28, // Fallback default
                    ...status,
                    hasTaken: status?.submitted || status?.blocked
                });
            } catch (e) {
                setExamStatus({ hasTaken: false });
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, [user.id]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) return (
        <div className="flex-center" style={{ height: '100vh' }}>
            <span className="loader" style={{ width: '40px', height: '40px', borderTopColor: 'var(--primary)' }}></span>
        </div>
    );

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '900px', paddingBottom: '4rem' }}>
            <header className="flex-between wrap mb-8 mt-8 glass-card" style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-md)' }}>
                <div className="flex-col">
                    <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Painel do Aluno</h1>
                    <p className="text-sm text-light">Olá, <strong className="text-primary">{user.nome}</strong></p>
                </div>
                <div className="flex gap-4 wrap">
                    {Boolean(user.is_admin) && (
                        <Button
                            onClick={() => navigate('/admin')}
                            variant="outline"
                            style={{ fontWeight: '600' }}
                        >
                            Painel Admin
                        </Button>
                    )}
                    <Button
                        onClick={handleLogout}
                        variant="danger"
                    >
                        Sair
                    </Button>
                </div>
            </header>

            <main className="flex-col gap-6">
                <Card className="text-center" style={{ padding: '3rem 2rem' }}>
                    <h2 className="mb-4">Informações da Avaliação</h2>

                    {examStatus?.hasTaken ? (
                        <div className="flex-col gap-6">
                            {(examStatus.resultsReleased || user.is_admin) ? (
                                <>
                                    <Alert type="success">
                                        Você concluiu esta avaliação com sucesso! Confira seu desempenho abaixo.
                                    </Alert>

                                    {/* Relatório de Desempenho */}
                                    <div className="grid" style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                        gap: '1rem',
                                        marginTop: '1rem'
                                    }}>
                                        <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary)' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>Total Questões</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{examStatus.total || examStatus.totalQuestions || 28}</div>
                                        </div>
                                        <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--success)' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--success)', textTransform: 'uppercase' }}>Acertos</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)' }}>{examStatus.correct || 0}</div>
                                        </div>
                                        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--error)' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--error)', textTransform: 'uppercase' }}>Erros</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--error)' }}>{examStatus.wrong || 0}</div>
                                        </div>
                                    </div>

                                    {/* Informações de Período */}
                                    <div className="text-sm text-secondary" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '2rem',
                                        padding: '1rem',
                                        background: 'white',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--border-light)'
                                    }}>
                                        <div><strong>Início:</strong> {examStatus.startTime ? new Date(examStatus.startTime).toLocaleTimeString() : '--'}</div>
                                        <div><strong>Duração:</strong> {Math.floor(examStatus.duration / 60)}m {examStatus.duration % 60}s</div>
                                    </div>

                                    <div className="flex-center mt-4">
                                        <Button
                                            onClick={() => navigate('/revisao')}
                                            variant="outline"
                                            style={{ padding: '0.75rem 2rem' }}
                                        >
                                            Conferir Minhas Respostas
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-col flex-center" style={{ padding: '2rem' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⌛</div>
                                    <h3 style={{ color: 'var(--primary)' }}>Aguardando liberação do Resultado</h3>
                                    <p className="text-secondary mt-2">
                                        Sua prova foi enviada com sucesso! <br />
                                        O administrador liberará o resultado em breve.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-col flex-center">
                            <div className="flex-col gap-2 mb-8" style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                                <Alert type="warning" style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1rem' }}>Instruções de Segurança:</strong>
                                    <ul style={{ margin: 0, paddingLeft: '1.25rem', listStyleType: 'disc' }}>
                                        <li>Não minimize a janela ou mude de aba</li>
                                        <li>Não pressione F5 ou atualize a página</li>
                                        <li>Não clique fora da janela da prova</li>
                                        <li>A prova será encerrada automaticamente em caso de violação</li>
                                    </ul>
                                </Alert>
                                <p className="text-secondary text-center">
                                    Certifique-se de estar em um local tranquilo e com boa conexão.
                                </p>
                            </div>
                            <Button
                                onClick={() => navigate('/prova')}
                                className="btn-primary"
                                style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}
                            >
                                Iniciar Prova Agora
                            </Button>
                            <p className="text-sm text-muted mt-4">Duração: 120 minutos | {examStatus?.totalQuestions || 28} Questões</p>
                        </div>
                    )}
                </Card>

                <div className="grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <Card style={{ padding: '1.5rem' }} animate={false}>
                        <h3 className="text-secondary mb-2" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Seu Setor</h3>
                        <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{user.setor}</p>
                    </Card>
                    <Card style={{ padding: '1.5rem' }} animate={false}>
                        <h3 className="text-secondary mb-2" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Congregação</h3>
                        <p style={{ fontSize: '1.25rem', fontWeight: '800' }}>{user.congregacao || 'Não informada'}</p>
                    </Card>
                    <Card style={{ padding: '1.5rem' }} animate={false}>
                        <h3 className="text-secondary mb-2" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</h3>
                        <p style={{
                            fontSize: '1.2rem',
                            fontWeight: '800',
                            color: examStatus?.hasTaken ? 'var(--success)' : 'var(--warning)'
                        }}>
                            {examStatus?.hasTaken ? 'CONCLUÍDA ✓' : 'PENDENTE'}
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
