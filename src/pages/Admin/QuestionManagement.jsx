import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newQ, setNewQ] = useState({
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0
    });

    const loadQuestions = async () => {
        try {
            const data = await api.admin.getQuestions();
            setQuestions(data);
        } finally { setLoading(false); }
    };

    useEffect(() => { loadQuestions(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        const payload = {
            question_text: newQ.text,
            options: newQ.options.map((optText, idx) => ({
                text: optText,
                is_correct: idx === parseInt(newQ.correctIndex)
            }))
        };
        await api.admin.addQuestion(payload);
        setNewQ({ text: '', options: ['', '', '', ''], correctIndex: 0 });
        loadQuestions();
        alert('Questão adicionada!');
    };

    const handleDelete = async (id) => {
        if (!confirm('Deletar esta questão?')) return;
        await api.admin.deleteQuestion(id);
        loadQuestions();
    };

    return (
        <div className="flex-col gap-4">
            {/* Add Form */}
            <div className="glass-card">
                <h3 className="mb-4 text-blue">Adicionar Nova Questão</h3>
                <form onSubmit={handleAdd}>
                    <div className="input-group">
                        <label className="input-label">Enunciado</label>
                        <textarea className="input-field" value={newQ.text} onChange={e => setNewQ({ ...newQ, text: e.target.value })} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {newQ.options.map((opt, idx) => (
                            <div key={idx} className="input-group">
                                <label className="input-label">Opção {idx + 1}</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="radio"
                                        name="correctOpt"
                                        checked={parseInt(newQ.correctIndex) === idx}
                                        onChange={() => setNewQ({ ...newQ, correctIndex: idx })}
                                    />
                                    <input
                                        className="input-field"
                                        value={opt}
                                        onChange={e => {
                                            const newOpts = [...newQ.options];
                                            newOpts[idx] = e.target.value;
                                            setNewQ({ ...newQ, options: newOpts });
                                        }}
                                        required
                                        placeholder={`Opção ${idx + 1}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Salvar Questão</button>
                </form>
            </div>

            {/* List */}
            <div className="glass-card">
                <h3 className="mb-4 text-blue">Questões Existentes ({questions.length})</h3>
                {questions.map(q => (
                    <div key={q.id} style={{ borderBottom: '1px solid #E5E7EB', padding: '1rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ fontWeight: '600' }}>{q.question_text}</p>
                            <button onClick={() => handleDelete(q.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Excluir</button>
                        </div>
                        <ul style={{ marginLeft: '1rem', marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                            {q.options && q.options.map((opt, i) => (
                                <li key={i} style={{ color: opt.is_correct ? 'green' : 'inherit', fontWeight: opt.is_correct ? 'bold' : 'normal' }}>
                                    {opt.option_text} {opt.is_correct && '(Correta)'}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionManagement;
