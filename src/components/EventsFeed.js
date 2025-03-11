import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, BookmarkPlus, PenLine, Upload, X, Calendar, Clock, MapPin } from 'lucide-react';
import { postService } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

const EventsFeed = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imagem: null,
    data_evento: '',
    hora_evento: '',
    local_evento: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const result = await postService.getEvents();
      if (result.status === 'success' && result.data) {
        setEvents(result.data);
      } else {
        throw new Error(result.message || 'Erro ao carregar eventos');
      }
    } catch (err) {
      setError(err.message || 'Erro ao carregar eventos');
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
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.imagem ||
        !formData.data_evento || !formData.hora_evento || !formData.local_evento) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('content', formData.content);
      formPayload.append('category', 'Eventos');
      formPayload.append('imagem', formData.imagem);
      formPayload.append('data_evento', formData.data_evento);
      formPayload.append('hora_evento', formData.hora_evento);
      formPayload.append('local_evento', formData.local_evento);

      const result = await postService.savePost(formPayload);
      
      if (result.status === 'success') {
        setShowModal(false);
        setFormData({
          title: '',
          content: '',
          imagem: null,
          data_evento: '',
          hora_evento: '',
          local_evento: ''
        });
        loadEvents();
        toast.success("Evento publicado com sucesso");
      } else {
        throw new Error(result.message || "Erro ao publicar evento");
      }
    } catch (err) {
      toast.error(err.message || "Erro ao publicar evento");
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

  const formatTime = (timeString) => {
    try {
      if (!timeString) return '';
      return timeString.substring(0, 5); 
    } catch {
      return timeString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-[#346c79]/10 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#346c79]">Carregando eventos...</div>
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
        {/* Botão de Novo Evento */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Eventos</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-[#346c79] text-white rounded-lg hover:bg-[#346c79]/90 transition-colors"
            >
              <PenLine size={20} className="mr-2" />
              Criar Evento
            </button>
          </div>
        </div>

        {/* Modal de Criação */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Criar Evento</h2>
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
                        placeholder="Digite o título do evento"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data do Evento
                        </label>
                        <input
                          type="date"
                          name="data_evento"
                          value={formData.data_evento}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Horário
                        </label>
                        <input
                          type="time"
                          name="hora_evento"
                          value={formData.hora_evento}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Local
                      </label>
                      <input
                        type="text"
                        name="local_evento"
                        value={formData.local_evento}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                        placeholder="Digite o local do evento"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                        placeholder="Digite a descrição do evento"
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
                      {isSubmitting ? 'Publicando...' : 'Publicar Evento'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Feed de Eventos */}
        <div className="space-y-6">
          {events.map((event) => (
            <article key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Imagem do Evento */}
              {event.imagem && (
                <div className="relative h-64">
                  <img
                    src={`https://api.cca-fll.com.br${event.imagem}`}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Conteúdo */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{event.username}</h3>
                    <p className="text-sm text-gray-500">
                      Publicado em {formatDate(event.created_at)}
                    </p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h2>

                {/* Detalhes do Evento */}
                <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={20} className="mr-2 text-[#346c79]" />
                    <div>
                      <p className="text-sm font-medium">Data</p>
                      <p>{formatDate(event.data_evento)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={20} className="mr-2 text-[#346c79]" />
                    <div>
                      <p className="text-sm font-medium">Horário</p>
                      <p>{formatTime(event.hora_evento)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={20} className="mr-2 text-[#346c79]" />
                    <div>
                      <p className="text-sm font-medium">Local</p>
                      <p>{event.local_evento}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {event.content}
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

export default EventsFeed;