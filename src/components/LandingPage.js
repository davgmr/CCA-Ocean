import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const ImageWithBackground = ({ src, alt, position = 'right', isMobile }) => {
  if (isMobile) {
    return (
      <div className="w-full h-64 relative mb-8">
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    );
  }

  const isRight = position === 'right';
  return (
    <div className={`absolute ${isRight ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 h-96 hidden lg:block`}>
      <div className="relative">
        <div 
          className={`absolute top-1/2 -translate-y-1/2 ${isRight ? 'right-0' : 'left-0'} 
          w-[32rem] h-[32rem] bg-white ${isRight ? 'rounded-l-full' : 'rounded-r-full'}`}
        />
        <div 
          className={`relative z-10 w-[24rem] h-[24rem] rounded-full overflow-hidden 
          border-8 border-white shadow-xl ${isRight ? 'mr-20' : 'ml-20'}`}
        >
          <img 
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      title: "Compartilhe sua ciência e construa o futuro com as próprias mãos!",
      description: "Entenda como alunos da robótica criaram um site visando auxiliar o trabalho de profissionais que exploram o oceano com o objetivo de realizar melhorias no mundo em que estamos inseridos.",
      image: "/images/backgrounds/cientistas.png",
      alt: "Cientistas trabalhando",
      position: "right"
    },
    {
      title: "Área Maker",
      description: "A CCA Interconnect Ocean, oferece um espaço exclusivo para a educação sobre o oceano. Mergulhe conosco nesse mundo das profundezas! Disponibilizamos uma série de atividades lúdicas e educativas, adaptadas para diferentes idades. Despertamos a curiosidade das crianças e as inspiramos a proteger nossos mares. Acreditamos que a educação ambiental começa cedo, queremos formar cidadãos conscientes e comprometidos com a preservação marinha.",
      image: "/images/backgrounds/maker.png",
      alt: "Ilustração Área Maker",
      position: "left"
    },
    {
      title: "Comuniquem e Compartilhem",
      description: (
        <>
          <p className="text-xl lg:text-2xl leading-relaxed text-white font-semibold mb-4">
            Queremos transformar o futuro dos oceanos!
          </p>
          <p className="text-xl lg:text-2xl leading-relaxed text-white mb-4">
            Nosso laboratório digital conecta pesquisadores de todo o mundo, promovendo a colaboração 
            e o avanço da ciência marinha. Com ferramentas para compartilhar ideias, realizar pesquisas 
            e aprender, estamos impulsionando a descoberta de soluções para os desafios que os oceanos enfrentam.
          </p>
          <p className="text-xl lg:text-2xl font-bold text-white">
            Seja parte dessa revolução!
          </p>
        </>
      ),
      image: "/images/backgrounds/interpessoal.png",
      alt: "Ilustração de Rede",
      position: "right"
    },
    {
      title: "CCA",
      description: "O nome CCA surge com base no propósito do nosso site: Comunicação; Compartilhamento; Acessibilidade. O 'C' de comunicação vem do propósito de facilitar a interação entre profissionais que estejam geograficamente distantes. O segundo 'C' vem da ideia de ser necessário o compartilhamento entre estudiosos e profissionais, afinal - 'Ciência só é ciência quando compartilhada'. E por fim, o 'A' surge com o propósito de tornar a plataforma acessível para todas as pessoas que desejarem acessar nossos serviços.",
      image: "/images/backgrounds/pessoas.png",
      alt: "Reunião de Equipe",
      position: "left"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#346c79' }}>
      {/* Header */}
      <header className="relative">
        <div className="h-[200px] lg:h-[300px] bg-center bg-cover flex items-center justify-center relative"
          style={{
            backgroundImage: `url('/images/backgrounds/marcapa.png')`
          }}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 text-center text-white">
            <motion.h1 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl lg:text-7xl font-bold mb-4"
            >
              CCA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl lg:text-2xl"
            >
              Interconnected Ocean
            </motion.p>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 py-3 flex justify-between items-center" style={{ color: '#346c79' }}>
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="px-4 pb-4" style={{ color: '#346c79' }}>
              <div className="flex flex-col space-y-3">
                <Link to="/sobre" className="hover:opacity-80 transition-opacity py-2">
                  Sobre a CCA Interconnected Ocean
                </Link>
                <Link to="/faq" className="hover:opacity-80 transition-opacity py-2">
                  FAQ - Perguntas Frequentes
                </Link>
                <Link to="/area-maker" className="hover:opacity-80 transition-opacity py-2">
                  Conheça a Área Maker
                </Link>
                <Link to="/participe" className="hover:opacity-80 transition-opacity py-2">
                  Faça parte desse vasto oceano
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="bg-white shadow-lg hidden lg:block">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="flex justify-between items-center text-base py-4" style={{ color: '#346c79' }}>
              <Link to="/sobre" className="hover:opacity-80 transition-opacity">
                Sobre a CCA Interconnected Ocean
              </Link>
              <Link to="/faq" className="hover:opacity-80 transition-opacity">
                FAQ - Perguntas Frequentes
              </Link>
              <Link to="/area-maker" className="hover:opacity-80 transition-opacity">
                Conheça a Área Maker
              </Link>
              <Link to="/participe" className="hover:opacity-80 transition-opacity">
                Faça parte desse vasto oceano
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="py-10 lg:py-20">
        {/* Seções móveis e desktop */}
        {sections.map((section, index) => (
          <section key={index} className="mb-16 lg:mb-32 relative overflow-hidden lg:h-[500px]">
            <div className="max-w-screen-2xl mx-auto px-4 lg:px-16">
              <div className={`flex flex-col lg:flex-row items-center ${section.position === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'} h-full`}>
                {/* Versão mobile da imagem */}
                <div className="lg:hidden w-full">
                  <ImageWithBackground
                    src={section.image}
                    alt={section.alt}
                    isMobile={true}
                  />
                </div>

                {/* Conteúdo */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-3/5 px-4 lg:px-24"
                >
                  <h2 className="text-3xl lg:text-6xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                    {section.title}
                  </h2>
                  <div className="text-lg lg:text-2xl leading-relaxed text-white">
                    {section.description}
                  </div>
                </motion.div>

                {/* Versão desktop da imagem */}
                <ImageWithBackground
                  src={section.image}
                  alt={section.alt}
                  position={section.position}
                  isMobile={false}
                />
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="py-10 lg:py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-8 lg:mb-12">
            {/* Logo e Slogan */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <div className="bg-white rounded-lg p-4 shadow-md mb-6 w-32 lg:w-48">
                  <img 
                    src="/images/logos/logoazul.png"
                    alt="Logo CCA"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <p className="text-sm lg:text-base leading-relaxed" style={{ color: '#346c79' }}>
                Compartilhe sua ciência e construa o futuro com as próprias mãos!
              </p>
            </div>

            {/* Links Rápidos */}
            <div className="text-sm lg:text-base text-center lg:text-left" style={{ color: '#346c79' }}>
              <h3 className="font-bold mb-4 text-base lg:text-lg">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><Link to="/sobre" className="hover:opacity-80">Sobre Nós</Link></li>
                <li><Link to="/area-maker" className="hover:opacity-80">Área Maker</Link></li>
                <li><Link to="/participe" className="hover:opacity-80">Participe</Link></li>
                <li><Link to="/faq" className="hover:opacity-80">FAQ</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="text-sm lg:text-base text-center lg:text-left" style={{ color: '#346c79' }}>
              <h3 className="font-bold mb-4 text-base lg:text-lg">Contato</h3>
              <address className="not-italic space-y-3">
                <p>Endereço:</p>
                <p className="pl-4">Av. Dom José Delgado, S/n -<br/>
                Alemanha, São Luis - MA,<br/>
                65036-810</p>
                <p className="mt-4">E-mail:</p>
                <p className="pl-4">strikerrobotiquers@gmail.com</p>
              </address>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-200 text-sm lg:text-base" style={{ color: '#346c79' }}>
            CCA Interconnected Ocean - 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;