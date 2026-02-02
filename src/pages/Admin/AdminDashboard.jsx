import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import UserManagement from './UserManagement';
import QuestionManagement from './QuestionManagement';
import QuizControl from './QuizControl';
import ResultsRanking from './ResultsRanking';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');

    if (!user || !user.is_admin) {
        return <div className="p-4 text-red-500">Acesso Negado</div>;
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
        <div className="container" style={{ maxWidth: '1400px' }}>
            <header className="glass-card flex-between wrap mb-8 mt-4" style={{ padding: '1.5rem' }}>
                <div>
                    <h1 className="m-0" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>Painel Administrativo</h1>
                    <p className="text-light m-0">Administrador: {user.nome}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => navigate('/')} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', width: 'auto' }}>Voltar</button>
                    <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', width: 'auto' }}>Sair</button>
                </div>
            </header>

            <div className="flex gap-4 admin-layout" style={{ display: 'flex' }}>
                <nav className="glass-card flex gap-2 admin-nav" style={{
                    flexDirection: 'column',
                    width: '280px',
                    padding: '1rem',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '2rem'
                }}>
                    <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>Usuários</TabButton>
                    <TabButton active={activeTab === 'questions'} onClick={() => setActiveTab('questions')}>Questões</TabButton>
                    <TabButton active={activeTab === 'control'} onClick={() => setActiveTab('control')}>Controle</TabButton>
                    <TabButton active={activeTab === 'results'} onClick={() => setActiveTab('results')}>Resultados</TabButton>
                </nav>

                <main style={{ flex: 1, width: '100%', overflow: 'hidden' }}>
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
            padding: '0.875rem 1.25rem',
            textAlign: 'left',
            background: active ? 'var(--primary)' : 'rgba(37, 99, 235, 0.05)',
            color: active ? 'white' : 'var(--text-main)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s',
            flexShrink: 0,
            minWidth: '120px'
        }}
    >
        {children}
    </button>
);

export default AdminDashboard;
