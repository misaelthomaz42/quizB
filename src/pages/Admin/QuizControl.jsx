import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const QuizControl = () => {
    const [active, setActive] = useState(false);
    const [resultsReleased, setResultsReleased] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadStatus = async () => {
        try {
            const data = await api.admin.getQuizStatus();
            setActive(data.active);
            setResultsReleased(data.resultsReleased);
        } finally { setLoading(false); }
    };

    useEffect(() => { loadStatus(); }, []);

    const toggleQuiz = async () => {
        const newState = !active;
        await api.admin.toggleQuiz(newState);
        setActive(newState);
        alert(newState ? 'Prova Iniciada (Liberada para usuários)' : 'Prova Pausada (Bloqueada para novas tentativas)');
    };

    const toggleResults = async () => {
        const newState = !resultsReleased;
        await api.admin.toggleResults(newState);
        setResultsReleased(newState);
        alert(newState ? 'Resultados Liberados (Usuários podem ver suas notas)' : 'Resultados Ocultos (Usuários verão "Aguardando liberação")');
    };

    if (loading) return <div className="flex-center" style={{ height: '50vh' }}>Carregando...</div>;

    return (
        <div className="flex flex-col gap-6">
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
                    onClick={toggleQuiz}
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
                        : 'Novos usuários não podem iniciar a prova.'}
                </p>
            </div>

            <div className="glass-card flex-center flex-col text-center" style={{ minHeight: '300px' }}>
                <h2 style={{ marginBottom: '2rem' }}>Resultado da Prova</h2>

                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: resultsReleased ? '#059669' : '#DC2626',
                    marginBottom: '2rem'
                }}>
                    {resultsReleased ? 'RESULTADOS LIBERADOS' : 'RESULTADOS OCULTOS'}
                </div>

                <button
                    onClick={toggleResults}
                    className="btn"
                    style={{
                        background: resultsReleased ? '#DC2626' : '#059669',
                        color: 'white',
                        fontSize: '1.25rem',
                        padding: '1rem 3rem'
                    }}
                >
                    {resultsReleased ? 'OCULTAR RESULTADOS' : 'LIBERAR RESULTADOS'}
                </button>

                <p className="mt-4 text-sm text-gray-500">
                    {resultsReleased
                        ? 'Usuários já podem visualizar suas notas e acertos.'
                        : 'Usuários verão a mensagem "Aguardando liberação do Resultado".'}
                </p>
            </div>
        </div>
    );
};

export default QuizControl;
