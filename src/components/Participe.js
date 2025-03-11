import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/api';

const Participe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verificar autenticação existente
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          // Verificar se o token ainda é válido
          if (parsedUser && parsedUser.token) {
            navigate('/dashboard');
          }
        } catch (error) {
          // Se houver erro ao parsear, limpar localStorage
          localStorage.removeItem('user');
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário começa a digitar
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação básica
    if (!formData.username || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.login(formData.username, formData.password);
      
      if (response.user) {
        // Garantir que os dados do usuário são válidos antes de salvar
        const userData = {
          ...response.user,
          lastLogin: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Adicionar um pequeno delay para garantir que o localStorage foi atualizado
        setTimeout(() => {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          console.log("Usuário carregado do localStorage:", storedUser); // Debug
          
          if (storedUser && storedUser.is_admin) {
              console.log("Usuário é admin, redirecionando para /admin");
              navigate('/admin', { replace: true });
          } else {
              console.log("Usuário comum, redirecionando para /dashboard");
              navigate('/dashboard', { replace: true });
          }
      }, 100);
      
      } else {
        throw new Error('Dados de usuário inválidos');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      if (err.name === 'TypeError' && err.message.includes('failed to fetch')) {
        setError('Erro de conexão. Verifique sua internet e tente novamente.');
      } else {
        setError(err.message || 'Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8"
         style={{
           backgroundImage: `url('/images/backgrounds/mar back.png')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <div className="absolute inset-0 bg-[#346c79] opacity-70" />

      <div className="relative z-10 w-full max-w-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-8 md:mb-12"
        >
          LOGIN
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center text-sm md:text-base"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              name="username"
              placeholder="Nome de Usuário"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 md:px-6 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white text-base md:text-lg
                       focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 md:px-6 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white text-base md:text-lg
                       focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-[#346c79] py-3 rounded-full text-base md:text-lg font-medium 
                     hover:bg-opacity-90 transition-all transform hover:scale-[1.02] 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            {isLoading ? "Carregando..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full bg-transparent border-2 border-white text-white py-3 rounded-full 
                     text-base md:text-lg font-medium hover:bg-white/10 transition-all transform 
                     hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white"
          >
            Criar conta agora
          </button>
        </form>
      </div>
    </div>
  );
};

export default Participe;