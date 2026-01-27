import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const QuizControl = () => {
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadStatus = async () => {
        try {
            const data = await api.admin.getQuizStatus();
            setActive(data.active);
        } finally { setLoading(false); }
    };

    useEffect(() => { loadStatus(); }, []);

    const toggle = async () => {
        const newState = !active;
        await api.admin.toggleQuiz(newState);
        setActive(newState);
        alert(newState ? 'Prova Iniciada (Liberada para usuários)' : 'Prova Pausada (Bloqueada para novas tentativas)');
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="glass-card flex-center flex-col text-center" style={{ minHeight: '300px' }}>
            <h2 style={{ marginBottom: '2rem' }}>Status da Prova</h2>

            <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: active ? '#059669' : '#DC2626',
                marginBottom: '2rem'
            }}>
                {active ? 'ATIVO / LIBERADO' : 'PAUSADO / BLOQUEADO'}
            </div>

            <button
                onClick={toggle}
                className="btn"
                style={{
                    background: active ? '#DC2626' : '#059669',
                    color: 'white',
                    fontSize: '1.25rem',
                    padding: '1rem 3rem'
                }}
            >
                {active ? 'PARAR PROVA' : 'LIBERAR PROVA'}
            </button>

            <p className="mt-4 text-sm text-gray-500">
                {active
                    ? 'Usuários podem iniciar a prova agora.'
                    : 'Novos usuários não podem iniciar a prova. Quem já começou pode continuar ?? (Depende da implementação de check)'}
            </p>
        </div>
    );
};

export default QuizControl;
