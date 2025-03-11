import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, BookmarkPlus, PenLine, FileText, X, Upload, Download, Eye } from 'lucide-react';
import { postService } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

const ArticlesFeed = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    arquivo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const result = await postService.getArticles();
      if (result.status === 'success' && result.data) {
        setArticles(result.data);
      } else {
        throw new Error(result.message || 'Erro ao carregar artigos');
      }
    } catch (err) {
      setError(err.message || 'Erro ao carregar artigos');
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFormData(prev => ({
          ...prev,
          arquivo: file
        }));
      } else {
        toast.error("Por favor, envie apenas arquivos PDF, DOC ou DOCX");
        e.target.value = '';
      }
    }
  };

  const handleFileAction = (arquivo, action) => {
    if (!arquivo) return;
    
    const fileUrl = `https://api.cca-fll.com.br${arquivo}`;
    
    if (action === 'view') {
      window.open(fileUrl, '_blank');
    } else if (action === 'download') {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = arquivo.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Por favor, preencha título e conteúdo");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('content', formData.content);
      formPayload.append('category', 'Artigos');
      
      if (formData.arquivo) {
        formPayload.append('arquivo', formData.arquivo);
      }

      const result = await postService.savePost(formPayload);
      
      if (result.status === 'success') {
        setShowModal(false);
        setFormData({
          title: '',
          content: '',
          arquivo: null
        });
        loadArticles();
        toast.success("Artigo publicado com sucesso");
      } else {
        throw new Error(result.message || "Erro ao publicar artigo");
      }
    } catch (err) {
      toast.error(err.message || "Erro ao publicar artigo");
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
        <div className="text-2xl text-[#346c79]">Carregando artigos...</div>
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
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Artigos Científicos</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-[#346c79] text-white rounded-lg hover:bg-[#346c79]/90 transition-colors"
            >
              <PenLine size={20} className="mr-2" />
              Escrever Artigo
            </button>
          </div>
        </div>

        {/* Modal de Criação de Artigo */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Escrever Artigo</h2>
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
                        placeholder="Digite o título do artigo"
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
                        placeholder="Digite o conteúdo do artigo"
                      />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Arquivo (PDF, DOC, DOCX)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#346c79] hover:text-[#346c79]/80">
                              <span>Upload de arquivo</span>
                              <input
                                type="file"
                                name="arquivo"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="sr-only"
                              />
                            </label>
                          </div>
                          {formData.arquivo && (
                            <p className="text-sm text-gray-500">
                              Arquivo selecionado: {formData.arquivo.name}
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
                      {isSubmitting ? 'Publicando...' : 'Publicar Artigo'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Articles Feed */}
        <div className="space-y-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Article Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-800">{article.username}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(article.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{article.title}</h2>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {article.content}
                </p>

                {/* Arquivo anexado e thumbnail */}
                {article.arquivo && (
                  <div className="mt-4 space-y-2">
                    {article.thumbnail ? (
                      <div className="space-y-2">
                        <img 
                          src={`https://api.cca-fll.com.br${article.thumbnail}`}
                          alt="Prévia do documento"
                          className="max-w-xs rounded-lg shadow-md cursor-pointer"
                          onClick={() => handleFileAction(article.arquivo, 'view')}
                        />
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleFileAction(article.arquivo, 'view')}
                            className="flex items-center text-[#346c79] hover:text-[#346c79]/80 transition-colors"
                          >
                            <Eye size={20} className="mr-2" />
                            <span>Visualizar PDF</span>
                          </button>
                          <button
                            onClick={() => handleFileAction(article.arquivo, 'download')}
                            className="flex items-center text-[#346c79] hover:text-[#346c79]/80 transition-colors"
                          >
                            <Download size={20} className="mr-2" />
                            <span>Baixar PDF</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleFileAction(article.arquivo, 'view')}
                          className="flex items-center text-[#346c79] hover:text-[#346c79]/80 transition-colors p-4 border rounded-lg"
                        >
                          <FileText size={20} className="mr-2" />
                          <span>Visualizar Documento</span>
                        </button>
                        <button
                          onClick={() => handleFileAction(article.arquivo, 'download')}
                          className="flex items-center text-[#346c79] hover:text-[#346c79]/80 transition-colors p-4 border rounded-lg"
                        >
                          <Download size={20} className="mr-2" />
                          <span>Baixar Documento</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Article Actions */}
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

export default ArticlesFeed;