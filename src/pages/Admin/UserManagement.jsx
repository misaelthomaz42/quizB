import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    const loadUsers = async () => {
        try {
            const data = await api.admin.getUsers();
            setUsers(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const handleToggleAdmin = async (user) => {
        if (!confirm(`Tornar ${user.nome} ${user.is_admin ? 'Normal User' : 'Admin'}?`)) return;
        await api.admin.updateUser(user.id, { ...user, is_admin: !user.is_admin ? 1 : 0 });
        loadUsers();
    };

    const handleBlock = async (user) => {
        const newStatus = user.status === 'blocked' ? 'active' : 'blocked';
        await api.admin.updateUser(user.id, { ...user, status: newStatus });
        loadUsers();
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza? Isso apagará todos os dados deste usuário.')) return;
        await api.admin.deleteUser(id);
        loadUsers();
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (!data.password) data.password = '123456';

        try {
            await api.register(data);
            alert('Usuário criado com sucesso!');
            e.target.reset();
            loadUsers();
        } catch (err) {
            alert('Erro ao criar: ' + err.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) return (
        <div className="flex-center" style={{ padding: '3rem' }}>
            <span className="loader" style={{ width: '32px', height: '32px', borderTopColor: 'var(--primary)' }}></span>
        </div>
    );

    return (
        <div className="flex-col gap-6">
            <Card>
                <h3 className="mb-6 text-primary">➕ Novo Usuário</h3>
                <form onSubmit={handleCreateUser} className="flex-col gap-4">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.25rem',
                        width: '100%'
                    }}>
                        <Input name="nome" label="Nome" placeholder="Nome completo" required />
                        <Input name="email" label="E-mail" type="email" placeholder="seu@email.com" required />
                        <Input name="setor" label="Setor" placeholder="Ex: 12" required />
                        <Input name="congregacao" label="Congregação" placeholder="Nome da congregação" required />
                        <Input name="idade" label="Idade" type="number" placeholder="Ex: 25" required />
                        <Input name="password" label="Senha" placeholder="Padrão: 123456" />
                    </div>
                    <Button type="submit" loading={submitLoading} className="w-full">Criar Conta de Usuário</Button>
                </form>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex-between wrap mb-6">
                    <h3 className="text-primary">👥 Gerenciamento ({users.length})</h3>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome / Setor</th>
                                <th>E-mail</th>
                                <th>Cargo</th>
                                <th>Status</th>
                                <th>Senha</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ fontWeight: '700' }}>{u.nome}</div>
                                        <div className="text-sm text-light">Área {u.setor}</div>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span style={{
                                            background: u.is_admin ? 'var(--primary-soft)' : '#F1F5F9',
                                            color: u.is_admin ? 'var(--primary)' : 'var(--text-secondary)',
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                        }}>
                                            {u.is_admin ? 'Admin' : 'Usuário'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: u.status === 'blocked' ? 'var(--error)' : 'var(--success)'
                                            }}></span>
                                            <span style={{
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                color: u.status === 'blocked' ? 'var(--error)' : 'var(--success)'
                                            }}>
                                                {u.status === 'blocked' ? 'Bloqueado' : 'Ativo'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <code style={{
                                            background: '#f1f5f9',
                                            padding: '0.2rem 0.4rem',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem'
                                        }}>
                                            {u.senha_hash}
                                        </code>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleToggleAdmin(u)}
                                                variant="outline"
                                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}
                                            >
                                                Cargo
                                            </Button>
                                            <Button
                                                onClick={() => handleBlock(u)}
                                                variant="outline"
                                                style={{
                                                    padding: '0.4rem 0.75rem',
                                                    fontSize: '0.8rem',
                                                    width: 'auto',
                                                    borderColor: u.status === 'blocked' ? 'var(--success)' : 'var(--warning)',
                                                    color: u.status === 'blocked' ? 'var(--success)' : 'var(--warning)'
                                                }}
                                            >
                                                {u.status === 'blocked' ? 'Ativar' : 'Barrar'}
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(u.id)}
                                                variant="danger"
                                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}
                                            >
                                                Excluir
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UserManagement;
