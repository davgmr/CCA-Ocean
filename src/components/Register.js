import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nome_completo: '',
    contato: '',
    email: '',
    profissao: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.username || !formData.password || !formData.email) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.register(formData);
      if (response.message) {
        navigate('/participe', { 
          state: { message: 'Cadastro realizado com sucesso! Aguarde a aprovação do administrador.' } 
        });
      }
    } catch (err) {
      console.error('Erro no registro:', err);
      setError(err.message || 'Erro ao realizar cadastro. Tente novamente.');
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
          className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
        >
          Cadastro
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              name="username"
              placeholder="Nome de Usuário *"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white
                       focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              name="password"
              placeholder="Senha *"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white
                       focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="nome_completo"
              placeholder="Nome Completo"
              value={formData.nome_completo}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white
                       focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white
                       focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="contato"
              placeholder="Contato"
              value={formData.contato}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white
                       focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="profissao"
              placeholder="Profissão"
              value={formData.profissao}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 border-2 
                       border-white text-white placeholder-white
                       focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-[#346c79] py-3 rounded-full font-medium 
                     hover:bg-opacity-90 transition-all transform hover:scale-[1.02] 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <button
            type="button"
            onClick={() => navigate('/participe')}
            className="w-full bg-transparent border-2 border-white text-white py-3 rounded-full 
                     font-medium hover:bg-white/10 transition-all transform hover:scale-[1.02]
                     focus:outline-none focus:ring-2 focus:ring-white"
          >
            Já tem uma conta? Faça login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;