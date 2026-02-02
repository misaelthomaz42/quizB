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
                const results = await api.getResults();
                // Filter results to find if current user has an entry
                const userAttempt = results.find(r => r.id === user.id);
                setExamStatus(userAttempt ? { hasTaken: true } : { hasTaken: false });
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
                    {user.is_admin && (
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
                    <p className="text-secondary mb-8" style={{ maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                        Clique no botão abaixo para iniciar sua prova. Certifique-se de estar em um local tranquilo e com boa conexão.
                    </p>

                    {examStatus?.hasTaken ? (
                        <Alert type="success">
                            Você já concluiu esta avaliação. Sua nota será processada e disponibilizada em breve pela coordenação.
                        </Alert>
                    ) : (
                        <div className="flex-col flex-center">
                            <Button
                                onClick={() => navigate('/exam')}
                                className="btn-primary"
                                style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}
                            >
                                Iniciar Prova Agora
                            </Button>
                            <p className="text-sm text-muted mt-4">Duração estimada: 60 minutos | 10 Questões</p>
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
