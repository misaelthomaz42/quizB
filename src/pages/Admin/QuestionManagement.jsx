import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
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
        setSubmitLoading(true);
        const payload = {
            question_text: newQ.text,
            options: newQ.options.map((optText, idx) => ({
                text: optText,
                is_correct: idx === parseInt(newQ.correctIndex)
            }))
        };
        try {
            await api.admin.addQuestion(payload);
            setNewQ({ text: '', options: ['', '', '', ''], correctIndex: 0 });
            loadQuestions();
            alert('Questão adicionada!');
        } catch (e) {
            alert('Erro ao adicionar: ' + e.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Deletar esta questão?')) return;
        await api.admin.deleteQuestion(id);
        loadQuestions();
    };

    if (loading) return (
        <div className="flex-center" style={{ padding: '3rem' }}>
            <span className="loader" style={{ width: '32px', height: '32px', borderTopColor: 'var(--primary)' }}></span>
        </div>
    );

    return (
        <div className="flex-col gap-6">
            <Card>
                <h3 className="mb-6 text-primary">📝 Nova Questão</h3>
                <form onSubmit={handleAdd} className="flex-col gap-4">
                    <div className="input-group">
                        <label className="input-label">Enunciado</label>
                        <textarea
                            className="input-field"
                            style={{ minHeight: '120px', resize: 'vertical' }}
                            value={newQ.text}
                            onChange={e => setNewQ({ ...newQ, text: e.target.value })}
                            placeholder="Descreva a pergunta aqui..."
                            required
                        />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {newQ.options.map((opt, idx) => (
                            <div key={idx} className="input-group">
                                <label className="input-label flex-between">
                                    <span>Alternativa {idx + 1}</span>
                                    <label className="flex gap-2 text-sm cursor-pointer items-center">
                                        <input
                                            type="radio"
                                            name="correctOpt"
                                            checked={parseInt(newQ.correctIndex) === idx}
                                            onChange={() => setNewQ({ ...newQ, correctIndex: idx })}
                                            style={{ width: '16px', height: '16px', accentColor: 'var(--success)' }}
                                        />
                                        <span style={{ color: parseInt(newQ.correctIndex) === idx ? 'var(--success)' : 'inherit', fontWeight: '700' }}>
                                            Correta
                                        </span>
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
                                        borderColor: parseInt(newQ.correctIndex) === idx ? 'var(--success)' : 'var(--border-light)',
                                        borderWidth: parseInt(newQ.correctIndex) === idx ? '2px' : '1px'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <Button type="submit" loading={submitLoading} className="w-full mt-4">Salvar Questão no Banco</Button>
                </form>
            </Card>

            <div className="flex-col gap-4">
                <h3 className="text-secondary" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Questões Cadastradas ({questions.length})
                </h3>
                {questions.map((q, index) => (
                    <Card key={q.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className="flex-between wrap mb-4">
                            <h4 style={{ color: 'var(--primary)', flex: 1, paddingRight: '1rem' }}>
                                {index + 1}. {q.question_text}
                            </h4>
                            <Button onClick={() => handleDelete(q.id)} variant="danger" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: 'auto' }}>
                                Remover
                            </Button>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '0.75rem'
                        }}>
                            {q.options && q.options.map((opt, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.9rem',
                                        background: opt.is_correct ? 'var(--success-soft)' : 'white',
                                        border: `1px solid ${opt.is_correct ? 'var(--success)' : 'var(--border-light)'}`,
                                        color: opt.is_correct ? 'var(--success)' : 'var(--text-secondary)',
                                        fontWeight: opt.is_correct ? '700' : '500'
                                    }}
                                >
                                    {opt.option_text} {opt.is_correct && '✓'}
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default QuestionManagement;
