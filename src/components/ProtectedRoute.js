import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const ProtectedRoute = ({ children, adminRequired = false }) => {
  const [authStatus, setAuthStatus] = useState({
    isChecking: true,
    isAuthenticated: false,
    isAdmin: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
          const response = await authService.checkAuth();
          console.log("Resposta da API de check-auth:", response);
  
          setAuthStatus({
              isChecking: false,
              isAuthenticated: true,
              isAdmin: response.user?.is_admin || false
          });
      } catch (error) {
          console.error('Erro na verificação de auth:', error);
          setAuthStatus({
              isChecking: false,
              isAuthenticated: false,
              isAdmin: false
          });
          navigate('/participe');
      }
  };

    checkAuth();
  }, [navigate, adminRequired]);

  if (authStatus.isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#346c79]/10">
        <div className="text-2xl text-[#346c79]">Carregando...</div>
      </div>
    );
  }

  // If admin route is required but user is not admin, redirect to dashboard
  console.log("Verificando ProtectedRoute:", authStatus);

if (adminRequired && !authStatus.isAdmin) {
    console.log("Usuário tentou acessar área admin, mas não é admin. Redirecionando para /dashboard.");
    return <Navigate to="/dashboard" replace />;
}

  // If not authenticated, the useEffect will handle redirect to /participe
  if (!authStatus.isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;