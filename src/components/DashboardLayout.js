import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Search,
  User,
  MessageCircle,
  FileText,
  Newspaper,
  Calendar,
  Hammer,
  Radio,
  Home,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    {
      id: 'home',
      icon: <Home size={24} />,
      label: "Home",
      path: "/dashboard"
    },
    {
      id: 'profile',
      icon: <User size={24} />,
      label: "Perfil",
      path: "/dashboard/profile"
    },
    {
      id: 'chat',
      icon: <MessageCircle size={24} />,
      label: "Chat",
      path: "/dashboard/chat"
    },
    {
      id: 'articles',
      icon: <FileText size={24} />,
      label: "Artigos",
      path: "/dashboard/articles"
    },
    {
      id: 'news',
      icon: <Newspaper size={24} />,
      label: "Notícias",
      path: "/dashboard/news"
    },
    {
      id: 'events',
      icon: <Calendar size={24} />,
      label: "Eventos",
      path: "/dashboard/events"
    },
    {
      id: 'maker',
      icon: <Hammer size={24} />,
      label: "Área Maker",
      path: "/dashboard/maker"
    },
    {
      id: 'lives',
      icon: <Radio size={24} />,
      label: "Lives",
      path: "/dashboard/lives"
    }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url('/images/backgrounds/mar back.png')` }}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-72 bg-[#346c79] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Container */}
        <div className="p-6 pb-8">
          <Link to="/" className="flex justify-center">
            <img 
              src="/images/logos/logobranco.png" 
              alt="CCA Logo" 
              className="w-20 h-20 md:w-24 md:h-24"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <Link
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center p-3 md:p-5 rounded-lg cursor-pointer
                  transition-all duration-200 ease-in-out
                  ${isActive(item.path)
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'hover:bg-white/10 text-white/90 hover:translate-x-1'}
                `}
              >
                <div className="w-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="ml-4 text-sm md:text-base font-medium">{item.label}</span>
              </Link>
              {(index === 2 || index === 5) && (
                <div className="mx-4 my-3 border-t border-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/90">
        {/* Top Bar with Menu and Search */}
        <div className="bg-white shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Search Bar */}
              <div className="flex-1 relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Busque"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 rounded-full py-2 md:py-3 px-4 md:px-6 pr-12 text-gray-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#346c79]"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;