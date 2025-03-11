import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Edit, Youtube } from 'lucide-react';
import { authService } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import AdminPosts from './AdminPosts';  

const AdminPanel = () => {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [lives, setLives] = useState({});
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [selectedLive, setSelectedLive] = useState({ key: '', data: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdminAndLoadData = async () => {
      try {
        // Primeiro verifica se o usuário é autenticado e admin
        const authResponse = await authService.checkAuth();
        
        if (!authResponse.user?.is_admin) {
          toast.error('Acesso não autorizado');
          navigate('/dashboard');
          return;
        }

        // Depois carrega os dados do dashboard
        await loadDashboardData();
      } catch (err) {
        console.error('Error:', err);
        toast.error('Erro de autenticação');
        navigate('/participe');
      }
    };

    checkAdminAndLoadData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Carrega dados dos usuários
      const dashboardResponse = await fetch('https://api.cca-fll.com.br/admin/dashboard', {
        credentials: 'include'
      });

      if (!dashboardResponse.ok) {
        throw new Error('Erro ao carregar dados do dashboard');
      }

      const dashboardData = await dashboardResponse.json();
      setPendingUsers(dashboardData.pending_users || []);
      setAllUsers(dashboardData.all_users || []);

      // Carrega dados das lives
      const livesResponse = await fetch('https://api.cca-fll.com.br/admin/lives', {
        credentials: 'include'
      });

      if (!livesResponse.ok) {
        throw new Error('Erro ao carregar lives');
      }

      const livesData = await livesResponse.json();
      setLives(livesData.lives || {});
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      const response = await fetch('https://api.cca-fll.com.br/admin/dashboard', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, action })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao ${action === 'approve' ? 'aprovar' : 'rejeitar'} usuário`);
      }

      toast.success(`Usuário ${action === 'approve' ? 'aprovado' : 'rejeitado'} com sucesso`);
      await loadDashboardData();
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.message);
    }
  };

  const handleLiveUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!selectedLive.data.title || !selectedLive.data.url) {
        toast.error('Por favor, preencha todos os campos');
        return;
      }
  
      const response = await fetch('https://api.cca-fll.com.br/admin/lives', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [selectedLive.key || `live${Date.now()}`]: {
            title: selectedLive.data.title,
            url: selectedLive.data.url
          }
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar lives');
      }
  
      const responseData = await response.json();
      toast.success(responseData.message || 'Live atualizada com sucesso');
      setShowLiveModal(false);
      await loadDashboardData();
    } catch (err) {
      console.error('Error updating live:', err);
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#346c79]">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção de Usuários Pendentes */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Usuários Pendentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome Completo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profissão
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nome_completo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.profissao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUserAction(user.id, 'approve')}
                        className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleUserAction(user.id, 'reject')}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seção de Gerenciamento de Lives */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Gerenciar Lives</h2>
          <button
            onClick={() => {
              setSelectedLive({ key: '', data: {} });
              setShowLiveModal(true);
            }}
            className="flex items-center px-4 py-2 bg-[#346c79] text-white rounded-lg hover:bg-[#346c79]/90"
          >
            <Youtube className="mr-2" size={20} />
            Adicionar Live
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(lives).map(([key, live]) => (
            <div key={key} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">{live.title}</h3>
              <div className="aspect-video mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${live.video_id}`}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button
                onClick={() => {
                  setSelectedLive({ key, data: live });
                  setShowLiveModal(true);
                }}
                className="flex items-center text-[#346c79] hover:text-[#346c79]/80"
              >
                <Edit size={16} className="mr-1" />
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edição de Live */}
      {showLiveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {selectedLive.key ? 'Editar Live' : 'Adicionar Live'}
              </h3>
              <form onSubmit={handleLiveUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={selectedLive.data.title || ''}
                      onChange={(e) => setSelectedLive(prev => ({
                        ...prev,
                        data: { ...prev.data, title: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL do YouTube
                    </label>
                    <input
                      type="url"
                      value={selectedLive.data.url || ''}
                      onChange={(e) => setSelectedLive(prev => ({
                        ...prev,
                        data: { ...prev.data, url: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLiveModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#346c79] text-white rounded-md hover:bg-[#346c79]/90"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <AdminPosts />

      <ToastContainer />
    </div>
  );
};

export default AdminPanel;