import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Sobre = () => {
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
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 lg:mb-8">
            Sobre a CCA Interconnected Ocean
          </h1>
          <div className="text-lg lg:text-2xl text-white space-y-6 lg:space-y-8">
            <p>
              A CCA Interconnected Ocean foi fundada pela equipe de robótica Striker, da escola
              Sesi São Luís. Tal ideia nasceu da paixão pela ciência e pela preservação dos
              oceanos, impulsionada pelo fato da equipe estar inserida na temporada
              SUBMERGED, da categoria de FLL. A temporada tem o propósito de fazer com que
              crianças e jovens mergulhem em um problema enfrentado por profissionais que
              exploram o oceano.
            </p>
            <p>
              A equipe realizou uma bateria de pesquisas, estudos e diálogos com especialistas,
              identificando assim que a comunidade científica não possuía uma comunicação e
              compartilhamento de informações adequadas, sendo estas fragmentadas, com
              dados contraditórios e ferramentas limitadas.
            </p>
            <p>
              Identificamos também que a educação marinha carecia de um espaço dedicado
              para que educadores pudessem compartilhar experiências, recursos e desenvolver
              atividades inovadoras, não recebendo a atenção necessária. Então,
              compreendemos a importância de criar um ambiente seguro voltado
              majoritariamente aos educadores marinhos, visando uma educação,
              conscientização e capacitação do público sobre os ecossistemas marinhos.
            </p>
            <p>
              Assim, mergulhamos em um desafio real: a falta de uma plataforma unificada para a
              comunidade científica marinha com uma acessibilidade adequada a diferentes
              públicos. Assim, surgiu a CCA Interconnected Ocean, uma plataforma inovadora
              com o propósito de criar um ambiente seguro para que profissionais exploradores
              do oceano possam se comunicar e compartilhar informações sem receios, ainda
              que estejam geograficamente afastados. Além de oferecer atividades lúdicas que
              despertam a curiosidade e a paixão pelo mundo marinho, a plataforma também
              promove a inclusão, garantindo a acessibilidade para pessoas com deficiências
              visuais e oferecendo acesso gratuito a profissionais credenciados.
            </p>
            <p>
              Nossa rede de comunicação dispõe de chat, artigos especializados, notícias
              atualizadas, eventos exclusivos e transmissões ao vivo.
            </p>
            <p>
              A CCA Interconnected Ocean surge como a solução para os desafios citados.
              Nossa plataforma oferece um ambiente colaborativo e seguro para que
              pesquisadores e educadores marinhos se conectem, compartilhem conhecimento e
              trabalhem em conjunto para proteger os oceanos.
            </p>
            
            <div className="bg-white/20 rounded-lg p-6 lg:p-8 mt-8">
              <h2 className="text-2xl lg:text-4xl font-bold mb-6">Nossos Valores</h2>
              <ul className="space-y-4 text-base lg:text-xl">
                <li className="flex items-center space-x-3">
                  <span className="text-2xl">🌊</span>
                  <span>Comunicação efetiva entre profissionais</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-2xl">🤝</span>
                  <span>Compartilhamento de conhecimento científico</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-2xl">♿</span>
                  <span>Acessibilidade para todos os usuários</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-2xl">🌍</span>
                  <span>Compromisso com a preservação dos oceanos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sobre;