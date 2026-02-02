import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserManagement from './UserManagement';
import QuestionManagement from './QuestionManagement';
import QuizControl from './QuizControl';
import ResultsRanking from './ResultsRanking';
import Card from '../../components/Card';
import Button from '../../components/Button';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');

    if (!user || !user.is_admin) {
        return (
            <div className="flex-center" style={{ height: '100vh' }}>
                <Card style={{ textAlign: 'center' }}>
                    <h2 style={{ color: 'var(--error)' }}>Acesso Negado</h2>
                    <p>Você não tem permissão para acessar esta área.</p>
                    <Button onClick={() => navigate('/')} className="mt-4">Voltar</Button>
                </Card>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'users': return <UserManagement />;
            case 'questions': return <QuestionManagement />;
            case 'control': return <QuizControl />;
            case 'results': return <ResultsRanking />;
            default: return <UserManagement />;
        }
    };

    return (
        <div className="container" style={{ maxWidth: '1400px', paddingBottom: '4rem' }}>
            <header className="glass-card flex-between wrap mb-8 mt-6" style={{ padding: '1.25rem 2rem' }}>
                <div className="flex-col">
                    <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Painel Administrativo</h1>
                    <p className="text-sm text-light">Administrador: <strong className="text-primary">{user.nome}</strong></p>
                </div>
                <div className="flex gap-4 wrap">
                    <Button onClick={() => navigate('/')} variant="outline">Ir para Home</Button>
                    <Button onClick={() => { logout(); navigate('/login'); }} variant="danger">Encerrar Sessão</Button>
                </div>
            </header>

            <div className="flex gap-6 admin-layout">
                <nav className="glass-card flex admin-nav" style={{
                    flexDirection: 'column',
                    padding: '1rem',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '6rem',
                    gap: '0.5rem'
                }}>
                    <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>👤 Usuários</TabButton>
                    <TabButton active={activeTab === 'questions'} onClick={() => setActiveTab('questions')}>📝 Questões</TabButton>
                    <TabButton active={activeTab === 'control'} onClick={() => setActiveTab('control')}>⚙️ Controle</TabButton>
                    <TabButton active={activeTab === 'results'} onClick={() => setActiveTab('results')}>📊 Resultados</TabButton>
                </nav>

                <main style={{ flex: 1, minWidth: 0 }}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        style={{
            padding: '1rem 1.25rem',
            textAlign: 'left',
            background: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'var(--text-secondary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'var(--transition)',
            fontSize: '0.95rem'
        }}
    >
        {children}
    </button>
);

export default AdminDashboard;
