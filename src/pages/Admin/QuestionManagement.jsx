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
                <h3 className="mb-4 text-primary">Adicionar Nova Questão</h3>
                <form onSubmit={handleAdd} className="flex-col gap-4">
                    <div className="input-group">
                        <label className="input-label">Enunciado da Questão</label>
                        <textarea
                            className="input-field"
                            style={{ minHeight: '100px', resize: 'vertical' }}
                            value={newQ.text}
                            onChange={e => setNewQ({ ...newQ, text: e.target.value })}
                            placeholder="Digite o enunciado da questão aqui..."
                            required
                        />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {newQ.options.map((opt, idx) => (
                            <div key={idx} className="input-group">
                                <label className="input-label flex-between">
                                    <span>Opção {idx + 1}</span>
                                    <label className="flex gap-2 text-sm cursor-pointer">
                                        <input
                                            type="radio"
                                            name="correctOpt"
                                            checked={parseInt(newQ.correctIndex) === idx}
                                            onChange={() => setNewQ({ ...newQ, correctIndex: idx })}
                                            style={{ margin: 0 }}
                                        />
                                        Correta
                                    </label>
                                </label>
                                <input
                                    className="input-field"
                                    value={opt}
                                    onChange={e => {
                                        const newOpts = [...newQ.options];
                                        newOpts[idx] = e.target.value;
                                        setNewQ({ ...newQ, options: newOpts });
                                    }}
                                    required
                                    placeholder={`Texto da opção ${idx + 1}`}
                                    style={{
                                        borderColor: parseInt(newQ.correctIndex) === idx ? 'var(--success)' : '',
                                        boxShadow: parseInt(newQ.correctIndex) === idx ? '0 0 0 2px rgba(16, 185, 129, 0.1)' : ''
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" style={{ padding: '1rem' }}>
                        Salvar e Adicionar Questão
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="glass-card">
                <h3 className="mb-4 text-primary">Questões Existentes ({questions.length})</h3>
                <div className="flex-col gap-4">
                    {questions.map((q, index) => (
                        <div key={q.id} className="animate-fade-in" style={{
                            padding: '1.5rem',
                            background: 'rgba(248, 250, 252, 0.8)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid #E2E8F0',
                            animationDelay: `${index * 0.03}s`
                        }}>
                            <div className="flex-between wrap mb-4">
                                <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary-dark)', flex: 1 }}>
                                    {index + 1}. {q.question_text}
                                </p>
                                <button
                                    onClick={() => handleDelete(q.id)}
                                    className="btn btn-danger"
                                    style={{ padding: '0.5rem 1rem', width: 'auto', fontSize: '0.85rem' }}
                                >
                                    Excluir
                                </button>
                            </div>
                            <div className="grid gap-2" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '0.75rem'
                            }}>
                                {q.options && q.options.map((opt, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            fontSize: '0.9rem',
                                            background: opt.is_correct ? 'rgba(16, 185, 129, 0.1)' : 'white',
                                            border: opt.is_correct ? '1px solid var(--success)' : '1px solid #E2E8F0',
                                            color: opt.is_correct ? 'var(--success)' : 'var(--text-main)',
                                            fontWeight: opt.is_correct ? '600' : '400'
                                        }}
                                    >
                                        {opt.option_text} {opt.is_correct && '✓'}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionManagement;
