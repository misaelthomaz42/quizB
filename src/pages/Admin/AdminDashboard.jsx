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
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '1rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div>
                    <h1 style={{ color: 'var(--primary)', margin: 0 }}>Painel Administrativo</h1>
                    <p style={{ color: 'var(--text-light)' }}>Logado como {user.nome}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/')} className="btn btn-outline">Voltar ao App</button>
                    <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-primary">Sair</button>
                </div>
            </header>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <nav className="glass-card" style={{
                    width: '250px',
                    height: 'fit-content',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>Usuários</TabButton>
                    <TabButton active={activeTab === 'questions'} onClick={() => setActiveTab('questions')}>Questões</TabButton>
                    <TabButton active={activeTab === 'control'} onClick={() => setActiveTab('control')}>Controle Quiz</TabButton>
                    <TabButton active={activeTab === 'results'} onClick={() => setActiveTab('results')}>Resultados & Ranking</TabButton>
                </nav>

                <main style={{ flex: 1, minWidth: '300px' }}>
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
            padding: '1rem',
            textAlign: 'left',
            background: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'var(--text-main)',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s'
        }}
    >
        {children}
    </button>
);

export default AdminDashboard;
