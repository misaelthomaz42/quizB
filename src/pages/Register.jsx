import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        setor: '',
        congregacao: '',
        idade: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    // Definir as congregações para cada área
    const congregacoesPorArea = {
        '12': [
            'Alto Jordão',
            'Córrego da Gameleira',
            'Jardim Primavera',
            'Alto Castelo Branco',
            'Alto Castelo Branco 2',
            'Alto da Esperança',
            'Sudene',
            'Xingu',
            'Córrego da Jaqueira',
            'Sonho Dourado',
            'Jordão Baixo',
            'Alto da Jaqueira'
        ],
        '32': [
            'Abrigo Social I',
            'Alto do Carneiro',
            'Abrigo social 3',
            'Areeiro 1',
            'Areeiro 2',
            'Areeiro 3',
            'Boa vista',
            'Jordão',
            'Jordão2'
        ]
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Se mudou a área, resetar a congregação
        if (name === 'setor') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                congregacao: '' // Resetar congregação quando mudar a área
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);
        try {
            await register(formData);
            navigate('/login');
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Obter lista de congregações baseada na área selecionada
    const congregacoesDisponiveis = formData.setor ? congregacoesPorArea[formData.setor] || [] : [];

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="text-center" style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>Crie sua conta</h2>
                <p className="text-center text-sm" style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
                    Preencha seus dados para avaliar seus conhecimentos
                </p>

                {error && (
                    <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex-col gap-4">
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Nome Completo</label>
                        <input name="nome" type="text" className="input-field" required value={formData.nome} onChange={handleChange} />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Email</label>
                        <input name="email" type="email" className="input-field" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="input-label">Área</label>
                            <select
                                name="setor"
                                className="input-field"
                                required
                                value={formData.setor}
                                onChange={handleChange}
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="">Selecione...</option>
                                <option value="12">12</option>
                                <option value="32">32</option>
                            </select>
                        </div>

                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="input-label">Idade</label>
                            <input name="idade" type="number" className="input-field" required value={formData.idade} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Congregação</label>
                        <select
                            name="congregacao"
                            className="input-field"
                            required
                            value={formData.congregacao}
                            onChange={handleChange}
                            disabled={!formData.setor}
                            style={{ cursor: formData.setor ? 'pointer' : 'not-allowed' }}
                        >
                            <option value="">
                                {formData.setor ? 'Selecione...' : 'Primeiro selecione uma área'}
                            </option>
                            {congregacoesDisponiveis.map((congregacao, index) => (
                                <option key={index} value={congregacao}>
                                    {congregacao}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Senha</label>
                        <input name="password" type="password" className="input-field" required value={formData.password} onChange={handleChange} placeholder="••••••••" />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Repita a Senha</label>
                        <input name="confirmPassword" type="password" className="input-field" required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>

                <div className="text-center mt-4 text-sm" style={{ color: 'var(--text-light)' }}>
                    Já tem uma conta? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>Faça Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
