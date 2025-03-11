import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const AreaMaker = () => {
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
            Área Maker
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white/20 rounded-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Atividades Educativas
              </h2>
              <ul className="text-base lg:text-xl text-white space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Experimentos práticos sobre oceanografia</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Workshops de conscientização ambiental</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Projetos de tecnologia marinha</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Atividades de reciclagem criativa</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/20 rounded-lg p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Recursos Disponíveis
              </h2>
              <ul className="text-base lg:text-xl text-white space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Materiais didáticos especializados</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Equipamentos para experimentos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Biblioteca digital marinha</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-2xl">•</span>
                  <span>Jogos educativos sobre o oceano</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 lg:mt-12 bg-white/20 rounded-lg p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">
              Conheça a Área Maker
            </h2>
            <div className="text-base lg:text-2xl text-white space-y-4">
              <p>
                Mergulhe de cabeça na ciência do mar com a CCA Interconnected Ocean!
                Quer fazer parte de uma comunidade de cientistas, exploradores e
                apaixonados pelo oceano? A CCA é o seu lugar!
              </p>
              <p>
                A área maker da CCA Interconnected Ocean é voltada principalmente para o
                educador marinho, um profissional que pode atuar em diferentes vertentes.
                Visando educação, conscientização e capacitação do público sobre os
                ecossistemas marinhos, desenvolvemos uma área com atividades lúdicas que conta
                com conteúdos educativos voltados para diferentes questões oceânicas.
                Pessoas com formações diversas podem atuar como educadores marinhos, a
                exemplo de biólogos, oceanógrafos, professores, guias turísticos e até mesmo
                voluntários.
              </p>
              <p>
                Contabilizando profissionais registrados, de acordo com o seminário do oceanógrafo
                João Thadeu de Menezes e do Ministério da educação, podemos obter cerca de
                2.621.792 pessoas apenas na área de atuação de oceanografia e professores
                registrados no país.
              </p>
              <p>
                Se você é um profissional que trabalha com esses propósitos, se junte à CCA e
                vamos juntos realizar a diferença no mundo em que estamos inseridos.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AreaMaker;