import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Edit2, MapPin, BookOpen, Upload, Trash2 } from 'lucide-react';
import { profileService } from '../services/api';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [postsCount, setPostsCount] = useState({
    'Artigos': 0,
    'Notícias': 0,
    'Eventos': 0,
    'Área Maker': 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true);
        const [profileData, countData] = await Promise.all([
          profileService.getProfile(),
          profileService.getUserPostsCount()
        ]);
        
        console.log('Dados do perfil:', profileData);
        console.log('Contagem de posts:', countData);
        
        setUserData(profileData);
        setPostsCount(countData);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados do perfil');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        console.log('Arquivo selecionado:', file);
        setIsLoading(true);
        const result = await profileService.updateProfileImage(file);
        console.log('Resposta do servidor:', result);
        
        if (result.profile_image) {
          setUserData(prevData => ({
            ...prevData,
            profile_image: result.profile_image
          }));
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        setError('Erro ao atualizar imagem de perfil');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveImage = async () => {
    try {
      console.log('Iniciando remoção da imagem');
      setIsLoading(true);
      const result = await profileService.removeProfileImage();
      console.log('Resultado da remoção:', result);
      
      setUserData(prevData => ({
        ...prevData,
        profile_image: null
      }));
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      setError('Erro ao remover imagem de perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updatedData = await profileService.updateProfile(userData);
      setUserData(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 relative bg-[#346c79]/10 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#346c79]">Carregando perfil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 relative bg-[#346c79]/10 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative bg-[#346c79]/10 min-h-screen">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/backgrounds/tubarão.png')",
          opacity: 0.8
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="h-48 bg-[#346c79]"/>
          <div className="px-6 pb-6">
            <div className="relative -mt-24 mb-4 flex justify-between items-end">
              <div className="flex items-end">
                <div className="w-48 h-48 rounded-xl border-4 border-white overflow-hidden bg-white shadow-lg relative group">
                  {userData?.profile_image ? (
                    <>
                      <img
                        src={`https://api.cca-fll.com.br/static/uploads/${userData.profile_image}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Erro ao carregar imagem:', e);
                          e.target.onerror = null;
                          e.target.src = '/images/profile-placeholder.png';
                        }}
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                              title="Trocar foto"
                            >
                              <Upload size={20} className="text-gray-600" />
                            </button>
                            <button
                              onClick={handleRemoveImage}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-red-100"
                              title="Remover foto"
                            >
                              <Trash2 size={20} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User size={64} className="text-gray-400" />
                      </div>
                      {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Adicionar foto"
                          >
                            <Upload size={20} className="text-gray-600" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="ml-6 mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">{userData?.username || 'Usuário'}</h1>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin size={18} className="mr-2" />
                    {userData?.profissao || 'Profissão não informada'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-6 px-6 py-2 bg-[#346c79] text-white rounded-full hover:bg-[#346c79]/90 transition-colors flex items-center"
              >
                <Edit2 size={18} className="mr-2" />
                {isEditing ? 'Cancelar Edição' : 'Editar Perfil'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 border-t border-gray-100 pt-6">
              {Object.entries(postsCount).map(([category, count]) => (
                <div key={category} className="text-center">
                  <p className="text-2xl font-bold text-[#346c79]">{count}</p>
                  <p className="text-gray-600">{category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Informações de Contato</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-3" />
                  {userData?.email || 'Email não informado'}
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen size={18} className="mr-3" />
                  {userData?.profissao || 'Profissão não informada'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="text-gray-600">Nome Completo</label>
                    <input
                      type="text"
                      value={userData?.nome_completo || ''}
                      onChange={e => setUserData({...userData, nome_completo: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600">Email</label>
                    <input
                      type="email"
                      value={userData?.email || ''}
                      onChange={e => setUserData({...userData, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600">Profissão</label>
                    <input
                      type="text"
                      value={userData?.profissao || ''}
                      onChange={e => setUserData({...userData, profissao: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#346c79] text-white rounded-lg"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Sobre</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {userData?.nome_completo ? 
                      `Olá, eu sou ${userData.nome_completo}!` : 
                      'Este usuário ainda não adicionou uma descrição.'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;