const API_URL = 'https://api.cca-fll.com.br';

const defaultOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const authService = {
  async login(username, password) {
    try {
      console.log('Tentando login com:', { username });
      
      const response = await fetch(`${API_URL}/login`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      console.log('Status da resposta:', response.status);
      
      const data = await response.json();
      console.log('Dados da resposta:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erro no login');
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Erro detalhado:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      console.log('Tentando registrar usuário:', userData);

      const response = await fetch(`${API_URL}/register`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro no registro');
      }

      return data;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  },

  async adminLogin(username, password) {
    try {
      console.log('Tentando login admin com:', { username });

      const response = await fetch(`${API_URL}/admin`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro no login admin');
      }

      if (data.admin_id) {
        localStorage.setItem('admin_id', data.admin_id);
      }

      return data;
    } catch (error) {
      console.error('Erro no login admin:', error);
      throw error;
    }
  },

  async checkAuth() {
    try {
      const response = await fetch(`${API_URL}/check-auth`, {
        ...defaultOptions,
        method: 'GET'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Não autenticado');
      }

      return response.json();
    } catch (error) {
      console.error('Erro na verificação de autenticação:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('admin_id');
      throw error;
    }
  },

  async logout() {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        ...defaultOptions,
        method: 'POST'
      });

      localStorage.removeItem('user');
      localStorage.removeItem('admin_id');
      return response.json();
    } catch (error) {
      console.error('Erro no logout:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('admin_id');
      throw error;
    }
  },

  async adminLogout() {
    try {
      const response = await fetch(`${API_URL}/admin/logout`, {
        ...defaultOptions,
        method: 'POST'
      });

      localStorage.removeItem('admin_id');
      return response.json();
    } catch (error) {
      console.error('Erro no logout admin:', error);
      localStorage.removeItem('admin_id');
      throw error;
    }
  }
};

export const adminService = {
  async getPendingUsers() {
    try {
      const response = await fetch(`${API_URL}/admin/dashboard`, {
        ...defaultOptions
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar usuários pendentes');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao carregar usuários pendentes:', error);
      throw error;
    }
  },

  async handleUserAction(userId, action) {
    try {
      const response = await fetch(`${API_URL}/admin/dashboard`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ user_id: userId, action })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Erro ao ${action === 'approve' ? 'aprovar' : 'rejeitar'} usuário`);
      }

      return response.json();
    } catch (error) {
      console.error('Erro na ação do usuário:', error);
      throw error;
    }
  },

  async getAllPosts() {
    try {
      const response = await fetch(`${API_URL}/admin/posts`, {
        ...defaultOptions
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar lista de posts');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao carregar lista de posts:', error);
      throw error;
    }
  },

  async deletePost(postId, type) {
    try {
      const response = await fetch(`${API_URL}/admin/posts/${postId}`, {
        ...defaultOptions,
        method: 'DELETE',
        body: JSON.stringify({ type })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao deletar post');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      throw error;
    }
  }
};

export const livesService = {
  async getLives() {
    try {
      const response = await fetch(`${API_URL}/lives`, {
        ...defaultOptions
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar lives');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao carregar lives:', error);
      throw error;
    }
  },

  async updateLives(livesData) {
    try {
      const response = await fetch(`${API_URL}/admin/lives`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(livesData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao atualizar lives');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao atualizar lives:', error);
      throw error;
    }
  }
};

export const postService = {
  async getFeed() {
    try {
      const response = await fetch(`${API_URL}/interconnected_ocean`, {
        ...defaultOptions
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar feed');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao carregar feed:', error);
      throw error;
    }
  },

  async getPost(postId) {
    try {
      const response = await fetch(`${API_URL}/post/${postId}`, {
        ...defaultOptions
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar post');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      throw error;
    }
  },

  async createPost(postData) {
    try {
      const response = await fetch(`${API_URL}/new_post`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao criar post');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      throw error;
    }
  },

  async updatePost(postId, postData) {
    try {
      const response = await fetch(`${API_URL}/post/${postId}`, {
        ...defaultOptions,
        method: 'PUT',
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao atualizar post');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      throw error;
    }
  },

  async deletePost(postId) {
    try {
      const response = await fetch(`${API_URL}/post/${postId}`, {
        ...defaultOptions,
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao deletar post');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      throw error;
    }
  },

  async savePost(formData) {
    try {
      const response = await fetch(`${API_URL}/save_post`, {
        credentials: 'include',
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar arquivo');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      throw error;
    }
  },

  async getArticles() {
    try {
      const response = await fetch(`${API_URL}/artigos`, {
        ...defaultOptions
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar artigos');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
      throw error;
    }
  },

  async getNews() {
    try {
      const response = await fetch(`${API_URL}/noticias`, {
        ...defaultOptions
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar notícias');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
      throw error;
    }
  },

  async getEvents() {
    try {
      const response = await fetch(`${API_URL}/eventos`, {
        ...defaultOptions
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar eventos');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      throw error;
    }
  },

  async getMakerArea() {
    try {
      const response = await fetch(`${API_URL}/area_maker`, {
        ...defaultOptions
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar área maker');
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro ao carregar área maker:', error);
      throw error;
    }
  }
};

export const profileService = {
  async getProfile() {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        ...defaultOptions
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar perfil');
      }

      return response.json();
    } catch (error) {
      console.error('Erro no getProfile:', error);
      throw error;
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao atualizar perfil');
      }

      return response.json();
    } catch (error) {
      console.error('Erro no updateProfile:', error);
      throw error;
    }
  },

  async updateProfileImage(file) {
    try {
      console.log('Enviando arquivo:', file);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/profile/update-image`, {
        credentials: 'include',
        method: 'POST',
        body: formData
      });

      console.log('Status da resposta:', response.status);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao atualizar imagem');
      }

      const data = await response.json();
      console.log('Resposta do servidor:', data);
      return data;
    } catch (error) {
      console.error('Erro no updateProfileImage:', error);
      throw error;
    }
  },

  async removeProfileImage() {
    try {
      const response = await fetch(`${API_URL}/profile/remove-image`, {
        ...defaultOptions,
        method: 'POST'
      });

      console.log('Status da resposta de remoção:', response.status);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao remover imagem');
      }

      const data = await response.json();
      console.log('Resposta do servidor após remoção:', data);
      return data;
    } catch (error) {
      console.error('Erro no removeProfileImage:', error);
      throw error;
    }
  },

  async getUserPostsCount() {
    try {
      const response = await fetch(`${API_URL}/profile/posts/count`, {
        ...defaultOptions
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao carregar contagem de posts');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao carregar contagem de posts:', error);
      throw error;
    }
  }
};