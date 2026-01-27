import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            const data = await api.admin.getUsers();
            setUsers(data);
        } catch (e) {
            alert(e);
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
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        // Default password for admin-created users or ask?
        // Let's assume a default or input.
        if (!data.password) data.password = '123456';

        try {
            await api.register(data); // Reuse public register or create specific admin endpoint? Public is fine or use api.admin.createUser if exists.
            // Using public register for now as it does the job.
            alert('Usuário criado com sucesso!');
            e.target.reset();
            loadUsers();
        } catch (err) {
            alert('Erro ao criar: ' + err.message);
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="flex-col gap-4">
            {/* Create User Form */}
            <div className="glass-card">
                <h3 className="mb-4 text-blue">Cadastrar Novo Usuário</h3>
                <form onSubmit={handleCreateUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input name="nome" placeholder="Nome" className="input-field" required />
                    <input name="email" placeholder="Email" className="input-field" required />
                    <input name="setor" placeholder="Setor" className="input-field" required />
                    <input name="congregacao" placeholder="Congregação" className="input-field" required />
                    <input name="idade" placeholder="Idade" type="number" className="input-field" required />
                    <input name="password" placeholder="Senha (Padrão: 123456)" className="input-field" />
                    <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Adicionar Usuário</button>
                </form>
            </div>

            <div className="glass-card animate-fade-in">
                <h2 className="mb-4" style={{ fontSize: '1.5rem', color: 'var(--primary-dark)' }}>Gerenciar Usuários</h2>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                                <th className="p-2">Nome</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Role</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                    <td className="p-2">{u.nome} <br /><span className="text-sm text-gray-500">{u.setor}</span></td>
                                    <td className="p-2">{u.email}</td>
                                    <td className="p-2">
                                        <span style={{
                                            background: u.is_admin ? '#DBEAFE' : '#F3F4F6',
                                            color: u.is_admin ? '#1E40AF' : '#374151',
                                            padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem'
                                        }}>
                                            {u.is_admin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <span style={{
                                            color: u.status === 'blocked' ? 'red' : 'green',
                                            fontWeight: 'bold'
                                        }}>
                                            {u.status === 'blocked' ? 'Bloqueado' : 'Ativo'}
                                        </span>
                                    </td>
                                    <td className="p-2" style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleToggleAdmin(u)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                                            Role
                                        </button>
                                        <button onClick={() => handleBlock(u)} className="btn" style={{ background: '#F59E0B', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                                            {u.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                                        </button>
                                        <button onClick={() => handleDelete(u.id)} className="btn" style={{ background: '#EF4444', color: 'white', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
