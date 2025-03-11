import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, BookmarkPlus, PenLine, Upload, X } from 'lucide-react';
import { postService } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imagem: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      const result = await postService.getNews();
      if (result.status === 'success' && result.data) {
        setNews(result.data);
      } else {
        throw new Error(result.message || 'Erro ao carregar notícias');
      }
    } catch (err) {
      setError(err.message || 'Erro ao carregar notícias');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          imagem: file
        }));
      } else {
        toast.error("Por favor, envie apenas imagens");
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.imagem) {
      toast.error("Por favor, preencha todos os campos e inclua uma imagem");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('content', formData.content);
      formPayload.append('category', 'Notícias');
      formPayload.append('imagem', formData.imagem);

      const result = await postService.savePost(formPayload);
      
      if (result.status === 'success') {
        setShowModal(false);
        setFormData({
          title: '',
          content: '',
          imagem: null
        });
        loadNews();
        toast.success("Notícia publicada com sucesso");
      } else {
        throw new Error(result.message || "Erro ao publicar notícia");
      }
    } catch (err) {
      toast.error(err.message || "Erro ao publicar notícia");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-[#346c79]/10 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#346c79]">Carregando notícias...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-[#346c79]/10 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#346c79]/10 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Botão de Nova Notícia */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Notícias</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-[#346c79] text-white rounded-lg hover:bg-[#346c79]/90 transition-colors"
            >
              <PenLine size={20} className="mr-2" />
              Publicar Notícia
            </button>
          </div>
        </div>

        {/* Modal de Criação */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Publicar Notícia</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                        placeholder="Digite o título da notícia"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Conteúdo
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                        placeholder="Digite o conteúdo da notícia"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imagem
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#346c79] hover:text-[#346c79]/80">
                              <span>Upload de imagem</span>
                              <input
                                type="file"
                                name="imagem"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="sr-only"
                              />
                            </label>
                          </div>
                          {formData.imagem && (
                            <p className="text-sm text-gray-500">
                              Imagem selecionada: {formData.imagem.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-4 py-2 bg-[#346c79] text-white rounded-md hover:bg-[#346c79]/90 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Publicando...' : 'Publicar Notícia'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Feed de Notícias */}
        <div className="space-y-6">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Imagem da Notícia */}
              {item.imagem && (
                <div className="relative h-64">
                  <img
                    src={`https://api.cca-fll.com.br${item.imagem}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Conteúdo */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.username}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.content}
                </p>
              </div>

              {/* Ações */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-gray-500 hover:text-[#346c79] transition-colors">
                      <Heart size={20} className="mr-2" />
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-[#346c79] transition-colors">
                      <MessageCircle size={20} className="mr-2" />
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-[#346c79] transition-colors">
                      <Share2 size={20} className="mr-2" />
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-[#346c79] transition-colors">
                    <BookmarkPlus size={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewsFeed;