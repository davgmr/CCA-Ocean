import React from 'react';

const DashboardHome = () => {
  return (
    <div className="flex-1">
      <div className="bg-[#346c79] text-white py-6 px-8 mb-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao CCA Interconnected Ocean</h1>
        <p className="text-lg opacity-90">
          Compartilhe sua ciência e construa o futuro com as próprias mãos!
        </p>
      </div>

      {/* Aqui você pode adicionar mais conteúdo para a página inicial do dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-[#346c79] mb-4">Seus Artigos</h2>
          <p className="text-gray-600">Comece a compartilhar seus conhecimentos com a comunidade.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-[#346c79] mb-4">Eventos Próximos</h2>
          <p className="text-gray-600">Descubra eventos e webinars sobre oceanografia.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-[#346c79] mb-4">Área Maker</h2>
          <p className="text-gray-600">Explore atividades práticas e experimentos.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;