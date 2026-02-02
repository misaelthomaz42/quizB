import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

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
        alert('Funcionalidade de recuperação de senha simulada. Verifique seu e-mail (mock).');
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '1rem' }}>
            <div className="glass-card animate-fade-in w-full" style={{ maxWidth: '420px' }}>
                <h2 className="text-center mb-2 text-primary">Bem-vindo de volta</h2>
                <p className="text-center text-sm text-light mb-8">
                    Entre com sua conta para realizar a avaliação
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Senha</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex-between mb-8">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm"
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}
                        >
                            Esqueceu a senha?
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ padding: '0.875rem' }}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-light">
                    Não tem uma conta? <Link to="/register" className="text-primary" style={{ textDecoration: 'none', fontWeight: '600' }}>Cadastre-se</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
