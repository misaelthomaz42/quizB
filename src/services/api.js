const API_URL = import.meta.env.VITE_API_URL || 'https://vestibular-api.onrender.com/api/misael';
console.log('🔗 API_URL em uso:', API_URL);

export const api = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro no cadastro');
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro no login');

    // Store user manually in localStorage for persistence across refreshes (simple session)
    if (data.success) {
      localStorage.setItem('biblical_app_user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('biblical_app_user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('biblical_app_user'));
  },

  startExam: async () => {
    const user = api.getCurrentUser();
    if (!user) throw new Error('Usuário não autenticado.');

    const response = await fetch(`${API_URL}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao iniciar');
    return data;
  },

  submitExam: async (answers) => {
    const user = api.getCurrentUser();
    if (!user) throw new Error('Usuário não autenticado.');

    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, answers }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao enviar');
    return data;
  },

  getExamStatus: async () => {
    const user = api.getCurrentUser();
    if (!user) return null;

    try {
      // We need an endpoint for checking status to persist "Awaiting Result"
      // I added /status/:userId in backend
      const response = await fetch(`${API_URL}/status/${user.id}`);
      if (response.ok) return await response.json();
      return {};
    } catch (e) {
      console.error(e);
      return {};
    }
  },

  blockUser: async () => {
    const user = api.getCurrentUser();
    if (!user) return;

    try {
      await fetch(`${API_URL}/admin/users/${user.id}`, {
        method: 'PUT', // Using generic user update endpoint for blocking
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id  // Admin check relies on ID in header for now (simplified)
        },
        body: JSON.stringify({ status: 'blocked' }),
      });
      // Update local session
      user.status = 'blocked';
      localStorage.setItem('biblical_app_user', JSON.stringify(user));
    } catch (e) { console.error(e); }
  },

  // --- ADMIN METHODS ---
  // Helper for admin headers
  _adminHeader: () => {
    const user = api.getCurrentUser();
    return {
      'Content-Type': 'application/json',
      'x-user-id': user?.id
    };
  },

  admin: {
    getUsers: async () => {
      const res = await fetch(`${API_URL}/admin/users`, { headers: api._adminHeader() });
      return await res.json();
    },
    updateUser: async (id, data) => { // data: { status, is_admin }
      await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: api._adminHeader(),
        body: JSON.stringify(data)
      });
    },
    deleteUser: async (id) => {
      await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: api._adminHeader()
      });
    },
    getQuestions: async () => {
      const res = await fetch(`${API_URL}/admin/questions`, { headers: api._adminHeader() });
      return await res.json();
    },
    addQuestion: async (data) => {
      await fetch(`${API_URL}/admin/questions`, {
        method: 'POST',
        headers: api._adminHeader(),
        body: JSON.stringify(data)
      });
    },
    deleteQuestion: async (id) => {
      await fetch(`${API_URL}/admin/questions/${id}`, {
        method: 'DELETE',
        headers: api._adminHeader()
      });
    },
    getQuizStatus: async () => {
      const res = await fetch(`${API_URL}/admin/quiz-status`, { headers: api._adminHeader() });
      return await res.json();
    },
    toggleQuiz: async (active) => {
      await fetch(`${API_URL}/admin/quiz-control`, {
        method: 'POST',
        headers: api._adminHeader(),
        body: JSON.stringify({ active })
      });
    },
    getResults: async () => {
      const res = await fetch(`${API_URL}/admin/results`, { headers: api._adminHeader() });
      return await res.json();
    },
    deleteResult: async (id) => {
      await fetch(`${API_URL}/admin/results/${id}`, {
        method: 'DELETE',
        headers: api._adminHeader()
      });
    }
  }
};
