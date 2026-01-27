import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const ResultsRanking = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadResults = async () => {
        try {
            const data = await api.admin.getResults();
            setResults(data);
        } finally { setLoading(false); }
    };

    useEffect(() => { loadResults(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Excluir este resultado? O usuário poderá fazer a prova novamente.')) return;
        await api.admin.deleteResult(id);
        loadResults();
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="glass-card">
            <h2 className="mb-4 text-blue">Ranking de Resultados</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#F3F4F6', textAlign: 'left' }}>
                            <th className="p-2">Pos</th>
                            <th className="p-2">Nome</th>
                            <th className="p-2">Congregação</th>
                            <th className="p-2">Nota</th>
                            <th className="p-2">Tempo</th>
                            <th className="p-2">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r, idx) => (
                            <tr key={r.attempt_id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <td className="p-2 font-bold">#{idx + 1}</td>
                                <td className="p-2">{r.nome}</td>
                                <td className="p-2">{r.congregação}</td>
                                <td className="p-2" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                                    {r.score ? r.score : 0}
                                </td>
                                <td className="p-2">{formatTime(r.duration_seconds)}</td>
                                <td className="p-2">
                                    <button onClick={() => handleDelete(r.attempt_id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsRanking;
