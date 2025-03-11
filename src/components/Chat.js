import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Menu, X, ChevronLeft } from 'lucide-react';
import io from 'socket.io-client';

const SOCKET_URL = 'https://api.cca-fll.com.br';

// Componente para a bolha de mensagem
const MessageBubble = ({ message, isCurrentUser, timestamp }) => (
  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} group`}>
    <div
      className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2 
      ${isCurrentUser 
        ? 'bg-[#346c79] text-white rounded-tr-none' 
        : 'bg-gray-100 text-gray-900 rounded-tl-none'
      } shadow-sm hover:shadow-md transition-shadow`}
    >
      <p className="break-words text-sm md:text-base">{message}</p>
      <p className={`text-xs mt-1 opacity-0 group-hover:opacity-70 transition-opacity
        ${isCurrentUser ? 'text-gray-200' : 'text-gray-500'}`}>
        {timestamp}
      </p>
    </div>
  </div>
);

// Componente para o botão de usuário
const UserButton = ({ user, isSelected, onClick, lastMessage }) => (
  <button
    onClick={onClick}
    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors
      ${isSelected ? 'bg-[#346c79]/10' : ''}`}
  >
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-[#346c79] rounded-full flex items-center justify-center">
          <User className="text-white" size={20} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{user}</p>
        {lastMessage && (
          <p className="text-sm text-gray-500 truncate">
            {lastMessage}
          </p>
        )}
      </div>
    </div>
  </button>
);

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUserList, setShowUserList] = useState(true);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
          setError('Usuário não autenticado');
          return;
        }
  
        setCurrentUser(userData.username);
        
        // Inicializar Socket.IO com as novas configurações
        initializeSocket(userData.username);
  
        await loadUsers(userData.username);
      } catch (err) {
        console.error('Erro na inicialização do chat:', err);
        setError('Erro ao inicializar o chat');
      } finally {
        setIsLoading(false);
      }
    };
  
    initializeChat();
  
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const initializeSocket = (username) => {
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 60000,
      auth: {
        username: username
      }
    });
  
    socketRef.current.on('connect', () => {
      console.log('Conectado ao servidor de chat');
      // Se houver usuário selecionado, rejoin na sala
      if (selectedUser) {
        socketRef.current.emit('join', {
          username: currentUser,
          otherUser: selectedUser
        });
      }
    });
  
    socketRef.current.on('disconnect', () => {
      console.log('Desconectado do servidor de chat');
    });
  
    socketRef.current.on('connect_error', (error) => {
      console.error('Erro de conexão:', error);
    });
  
    socketRef.current.on('reconnect', (attemptNumber) => {
      console.log('Reconectado após', attemptNumber, 'tentativas');
    });
  
    socketRef.current.on('chatMessage', (message) => {
      console.log('Mensagem recebida:', message);
      if ((message.from === selectedUser && message.to === username) ||
          (message.from === username && message.to === selectedUser)) {
        if (message.from !== username) {
          setMessages(prev => [...prev, message]);
        }
      }
    });
  };

  const loadUsers = async (username) => {
    try {
      const response = await fetch(
        `https://api.cca-fll.com.br/api/users?current_user=${username}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setError('Erro ao carregar lista de usuários');
    }
  };

  const loadMessages = async (otherUser) => {
    if (!currentUser || !otherUser) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.cca-fll.com.br/api/messages/${otherUser}?current_user=${currentUser}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Erro ao carregar mensagens');
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      setError('Erro ao carregar mensagens');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = async (user) => {
    if (selectedUser === user) return;

    if (selectedUser) {
      socketRef.current.emit('leave', {
        username: currentUser,
        otherUser: selectedUser
      });
    }

    setSelectedUser(user);
    setMessages([]);
    setShowUserList(false);
    
    await loadMessages(user);

    socketRef.current.emit('join', {
      username: currentUser,
      otherUser: user
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !socketRef.current) return;

    const messageData = {
      from: currentUser,
      to: selectedUser,
      msg: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    socketRef.current.emit('chatMessage', messageData);
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (e) {
      return '';
    }
  };

  if (error) {
    return (
      <div className="flex-1 bg-[#346c79]/10 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500 bg-white p-6 rounded-lg shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 bg-[#346c79]/10 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#346c79] animate-pulse">Carregando chat...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#346c79]/10 min-h-screen">
      <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6 h-screen">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-4rem)]">
          <div className="flex h-full">
            {/* Lista de Usuários - Desktop */}
            <div className={`w-80 border-r border-gray-200 hidden md:block
              transition-all duration-300 ease-in-out ${showUserList ? '' : 'md:w-0 md:opacity-0'}`}
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Conversas</h2>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
                  {users.map((user) => (
                    <UserButton
                      key={user}
                      user={user}
                      isSelected={selectedUser === user}
                      onClick={() => handleUserSelect(user)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Área de Chat */}
            <div className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {/* Header do Chat */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <button
                      onClick={() => setShowUserList(true)}
                      className="md:hidden mr-2"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#346c79] rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800">{selectedUser}</h2>
                    </div>
                    <button
                      onClick={() => setShowUserList(!showUserList)}
                      className="ml-auto hidden md:block"
                    >
                      {showUserList ? <ChevronLeft size={24} /> : <Menu size={24} />}
                    </button>
                  </div>

                  {/* Messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                  >
                    {messages.map((message, index) => (
                      <MessageBubble
                        key={message.id || index}
                        message={message.msg}
                        isCurrentUser={message.from === currentUser}
                        timestamp={formatMessageTime(message.timestamp)}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-[#346c79] focus:border-transparent
                                placeholder-gray-400 transition-shadow"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-[#346c79] text-white rounded-lg 
                                hover:bg-[#346c79]/90 transition-colors
                                disabled:opacity-50 disabled:cursor-not-allowed
                                flex items-center justify-center"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // Lista de Usuários - Mobile
                <div className="flex-1 md:hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Conversas</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <UserButton
                        key={user}
                        user={user}
                        isSelected={selectedUser === user}
                        onClick={() => handleUserSelect(user)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;