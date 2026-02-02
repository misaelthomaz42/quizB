import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [examStatus, setExamStatus] = useState(null);

    useEffect(() => {
        const status = api.getExamStatus();
        setExamStatus(status);
    }, []);

    const handleStartExam = async () => {
        try {
            const response = await api.startExam();
            if (response.status === 'submitted') {
                alert('Você já realizou a prova.');
                setExamStatus({ submitted: true });
            } else {
                navigate('/prova');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isSubmitted = examStatus?.submitted;

    return (
        <div className="container">
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h1 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem', margin: 0 }}>Sistema de Avaliação</h1>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {user.is_admin && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="btn"
                            style={{
                                background: 'var(--primary-dark)',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                fontSize: '0.9rem',
                                width: 'auto',
                                minWidth: '120px'
                            }}
                        >
                            Painel Admin
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem',
                            width: 'auto',
                            minWidth: '80px'
                        }}
                    >
                        Sair
                    </button>
                </div>
            </header>

            <main className="flex-center flex-col animate-fade-in" style={{ minHeight: '60vh' }}>
                <div className="glass-card text-center" style={{ maxWidth: '600px', width: '100%' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                        Olá, {user.nome}!
                    </h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        {isSubmitted
                            ? 'Sua prova foi enviada com sucesso. Agora é só aguardar!'
                            : 'Você tem uma avaliação pendente. A prova tem duração de 2 horas e deve ser feita sem interrupções.'}
                    </p>

                    {!isSubmitted ? (
                        <button
                            onClick={handleStartExam}
                            className="btn btn-primary"
                            style={{ fontSize: '1.2rem', padding: '1rem 3rem', width: 'auto', minWidth: '200px' }}
                        >
                            INICIAR PROVA
                        </button>
                    ) : (
                        <div
                            className="flex-center"
                            style={{
                                background: '#ECFDF5',
                                color: '#047857',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                fontWeight: '600',
                                fontSize: '1.2rem'
                            }}
                        >
                            Aguardando Resultado
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
