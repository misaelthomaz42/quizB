import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        alert('Funcionalidade de recuperação de senha simulada.');
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '1rem' }}>
            <Card style={{ maxWidth: '420px', width: '100%' }}>
                <div className="text-center mb-8">
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Acesso ao Sistema</h1>
                    <p className="text-light text-sm">Realize login para iniciar sua avaliação</p>
                </div>

                {error && <Alert type="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@email.com"
                        required
                    />

                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha secreta"
                        required
                    />



                    <Button
                        type="submit"
                        className="w-full"
                        loading={loading}
                    >
                        Entrar na Conta
                    </Button>
                </form>

                <div className="text-center mt-8 text-sm text-light">
                    Não possui cadastro? <Link to="/register" className="text-primary" style={{ fontWeight: '700', textDecoration: 'none' }}>Crie uma conta aqui</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
