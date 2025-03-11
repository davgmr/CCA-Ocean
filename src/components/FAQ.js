import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const FAQ = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#346c79' }}>
      <nav className="bg-white shadow-lg">
        {/* Mobile Menu Button */}
        <div className="lg:hidden px-4 py-3 flex justify-between items-center" style={{ color: '#346c79' }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img 
            src="/images/logos/logoazul.png"
            alt="Logo CCA"
            className="h-8 w-auto"
          />
        </div>

        {/* Menu Content */}
        <div className={`max-w-screen-2xl mx-auto px-4 lg:px-16 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="flex justify-between items-center text-base py-4" style={{ color: '#346c79' }}>
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Voltar para Home
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="max-w-screen-2xl mx-auto px-4 lg:px-16 py-8 lg:py-20">
        <div className="bg-white/10 rounded-lg p-6 lg:p-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 lg:mb-12">
            Perguntas Frequentes
          </h1>
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-white/20 rounded-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Como posso participar da comunidade?
              </h2>
              <p className="text-lg lg:text-xl text-white">
                Você pode se cadastrar em nossa plataforma e começar a interagir 
                com outros profissionais e entusiastas do oceano.
              </p>
            </div>

            <div className="bg-white/20 rounded-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Qual o objetivo da Área Maker?
              </h2>
              <p className="text-lg lg:text-xl text-white">
                A Área Maker é um espaço dedicado à educação e experimentação, 
                onde oferecemos atividades práticas e educativas sobre o oceano.
              </p>
            </div>

            <div className="bg-white/20 rounded-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Como funciona o compartilhamento de pesquisas?
              </h2>
              <p className="text-lg lg:text-xl text-white">
                Nossa plataforma oferece ferramentas para compartilhar descobertas, 
                dados e resultados de pesquisas de forma simples e acessível.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;