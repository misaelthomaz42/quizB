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
                <h3 className="mb-4 text-primary">Cadastrar Novo Usuário</h3>
                <form onSubmit={handleCreateUser} className="flex-col gap-4">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        width: '100%'
                    }}>
                        <div className="input-group">
                            <label className="input-label">Nome</label>
                            <input name="nome" placeholder="Nome completo" className="input-field" required />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input name="email" type="email" placeholder="seu@email.com" className="input-field" required />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Área</label>
                            <input name="setor" placeholder="Ex: 12" className="input-field" required />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Congregação</label>
                            <input name="congregacao" placeholder="Nome da congregação" className="input-field" required />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Idade</label>
                            <input name="idade" placeholder="Ex: 25" type="number" className="input-field" required />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Senha</label>
                            <input name="password" placeholder="Senha (Padrão: 123456)" className="input-field" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Adicionar Novo Usuário</button>
                </form>
            </div>

            <div className="glass-card animate-fade-in">
                <h2 className="mb-4 text-primary">Gerenciar Usuários</h2>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome / Área</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <div className="font-bold">{u.nome}</div>
                                        <div className="text-sm text-light">Área {u.setor}</div>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span style={{
                                            background: u.is_admin ? 'rgba(37, 99, 235, 0.1)' : '#F3F4F6',
                                            color: u.is_admin ? 'var(--primary)' : 'var(--text-light)',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.8rem',
                                            fontWeight: '600'
                                        }}>
                                            {u.is_admin ? 'Admin' : 'Usuário'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            color: u.status === 'blocked' ? 'var(--danger)' : 'var(--success)',
                                            fontWeight: '700',
                                            fontSize: '0.9rem'
                                        }}>
                                            {u.status === 'blocked' ? 'Bloqueado' : 'Ativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 wrap">
                                            <button
                                                onClick={() => handleToggleAdmin(u)}
                                                className="btn btn-outline"
                                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}
                                                title="Mudar cargo"
                                            >
                                                Cargo
                                            </button>
                                            <button
                                                onClick={() => handleBlock(u)}
                                                className="btn"
                                                style={{
                                                    background: u.status === 'blocked' ? 'var(--success)' : '#F59E0B',
                                                    color: 'white',
                                                    padding: '0.4rem 0.75rem',
                                                    fontSize: '0.8rem',
                                                    width: 'auto'
                                                }}
                                            >
                                                {u.status === 'blocked' ? 'Ativar' : 'Bloquear'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u.id)}
                                                className="btn btn-danger"
                                                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}
                                            >
                                                X
                                            </button>
                                        </div>
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
