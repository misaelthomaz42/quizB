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
            <header className="flex-between wrap mb-8 mt-4">
                <h1 className="m-0">Sistema de Avaliação</h1>
                <div className="flex gap-2 wrap">
                    {user.is_admin && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="btn btn-primary"
                            style={{ width: 'auto' }}
                        >
                            Painel Admin
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                        style={{ width: 'auto' }}
                    >
                        Sair
                    </button>
                </div>
            </header>

            <main className="flex-center flex-col animate-fade-in" style={{ minHeight: '60vh' }}>
                <div className="glass-card text-center w-full" style={{ maxWidth: '600px' }}>
                    <h2 className="mb-4 text-primary">
                        Olá, {user.nome}!
                    </h2>
                    <p className="text-light mb-8" style={{ fontSize: '1.1rem' }}>
                        {isSubmitted
                            ? 'Sua prova foi enviada com sucesso. Agora é só aguardar!'
                            : 'Você tem uma avaliação pendente. A prova tem duração de 2 horas e deve ser feita sem interrupções.'}
                    </p>

                    {!isSubmitted ? (
                        <button
                            onClick={handleStartExam}
                            className="btn btn-primary"
                            style={{ fontSize: '1.2rem', padding: '1rem 3rem', width: 'auto' }}
                        >
                            INICIAR PROVA
                        </button>
                    ) : (
                        <div
                            className="flex-center"
                            style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: 'var(--success)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: '700',
                                fontSize: '1.25rem',
                                border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}
                        >
                            ✓ Aguardando Resultado
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
