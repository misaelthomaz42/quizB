import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

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

    const congregacoesPorArea = {
        '12': [
            'Alto Jordão', 'Córrego da Gameleira', 'Jardim Primavera', 'Alto Castelo Branco',
            'Alto Castelo Branco 2', 'Alto da Esperança', 'Sudene', 'Xingu',
            'Córrego da Jaqueira', 'Sonho Dourado', 'Jordão Baixo', 'Alto da Jaqueira'
        ],
        '32': [
            'Abrigo Social I', 'Alto do Carneiro', 'Abrigo social 3', 'Areeiro 1',
            'Areeiro 2', 'Areeiro 3', 'Boa vista', 'Jordão', 'Jordão2'
        ]
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'setor') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                congregacao: ''
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
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const congregacoesDisponiveis = formData.setor ? congregacoesPorArea[formData.setor] || [] : [];

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '2.5rem 1rem' }}>
            <Card style={{ maxWidth: '600px', width: '100%' }}>
                <div className="text-center mb-8">
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Criar Conta</h1>
                    <p className="text-light text-sm">Registre-se no sistema para iniciar suas provas</p>
                </div>

                {error && <Alert type="error">{error}</Alert>}

                <form onSubmit={handleSubmit} className="flex-col gap-4">
                    <Input
                        label="Nome Completo"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        required
                    />

                    <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                    />

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1.5rem',
                        width: '100%'
                    }}>
                        <div className="input-group">
                            <label className="input-label">Setor / Área</label>
                            <select
                                name="setor"
                                className="input-field"
                                required
                                value={formData.setor}
                                onChange={handleChange}
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="">Selecione...</option>
                                <option value="12">Setor 12</option>
                                <option value="32">Setor 32</option>
                            </select>
                        </div>

                        <Input
                            label="Idade"
                            name="idade"
                            type="number"
                            value={formData.idade}
                            onChange={handleChange}
                            placeholder="Ex: 25"
                            required
                        />
                    </div>

                    <div className="input-group">
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
                                {formData.setor ? 'Selecione a congregação...' : 'Selecione um setor primeiro'}
                            </option>
                            {congregacoesDisponiveis.map((c, i) => (
                                <option key={i} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        width: '100%'
                    }}>
                        <Input
                            label="Senha"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Crie sua senha"
                            required
                        />

                        <Input
                            label="Confirmar Senha"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repita a senha"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full mt-4"
                        style={{ padding: '1rem' }}
                    >
                        Finalizar e Cadastrar
                    </Button>
                </form>

                <div className="text-center mt-8 text-sm text-light">
                    Já possui um cadastro? <Link to="/login" className="text-primary" style={{ fontWeight: '700', textDecoration: 'none' }}>Entrar Agora</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
