# Documentação CCA Interconnected Ocean

## Sobre o projeto

CCA Interconnected Ocean é uma plataforma de rede social educativa desenvolvida para conectar pesquisadores, educadores e entusiastas das ciências marinhas. O nome CCA representa os pilares da plataforma: **Comunicação**, **Compartilhamento** e **Acessibilidade**.

Este projeto foi desenvolvido como prova de conceito para uma equipe de robótica infantil da escola SESI São Luís, que está participando de uma competição com o tema "fundo do mar".

## Estrutura do projeto

```
cca-interconnected-ocean/
├── public/                  # Recursos estáticos
│   ├── images/              # Imagens e assets
│   └── index.html           # Página HTML principal
├── src/                     # Código fonte
│   ├── components/          # Componentes React
│   ├── contexts/            # Contextos React (AuthContext)
│   ├── hooks/               # Hooks personalizados
│   ├── services/            # Serviços e chamadas de API
│   ├── App.js               # Componente principal
│   └── index.js             # Ponto de entrada
├── package.json             # Dependências e scripts
└── tailwind.config.js       # Configuração do TailwindCSS
```

## Funcionalidades principais

### 1. Autenticação e autorização
- Login e registro de usuários
- Painel administrativo com aprovação de usuários
- Diferentes níveis de permissão

### 2. Compartilhamento de conteúdo
- Artigos científicos com upload de documentos (PDF, DOC, DOCX)
- Notícias com imagens
- Eventos com data, horário e localização
- Área maker com conteúdo educativo

### 3. Comunicação
- Sistema de chat em tempo real entre usuários
- Lives educativas com incorporação de vídeos do YouTube

### 4. Perfil de usuário
- Informações pessoais e profissionais
- Upload de foto de perfil
- Contador de publicações por categoria

### 5. Painel administrativo
- Aprovação/rejeição de novos usuários
- Gerenciamento de conteúdos
- Moderação da comunidade
- Gerenciamento de lives

## Tecnologias utilizadas

### Frontend
- **React.js**: Biblioteca JavaScript para construção de interfaces
- **React Router**: Navegação entre páginas
- **Context API**: Gerenciamento de estado global
- **TailwindCSS**: Framework CSS para estilização responsiva
- **Framer Motion**: Biblioteca para animações
- **Lucide React**: Biblioteca de ícones
- **Socket.io-client**: Comunicação em tempo real

### Integrações
- **Socket.io**: Para chat em tempo real
- **FormData**: Para upload de arquivos
- **YouTube Embed**: Para exibição de vídeos

## API

A aplicação se comunica com um backend através de vários endpoints. Os serviços foram organizados em módulos:

### authService
- `login(username, password)`: Autenticação de usuários
- `register(userData)`: Registro de novos usuários
- `adminLogin(username, password)`: Login para administradores
- `checkAuth()`: Verificação de autenticação
- `logout()`: Encerramento da sessão

### adminService
- `getPendingUsers()`: Obtenção de usuários pendentes
- `handleUserAction(userId, action)`: Aprovar/rejeitar usuários
- `getAllPosts()`: Listar todos os posts
- `deletePost(postId, type)`: Excluir publicações

### postService
- `getFeed()`: Obtenção do feed principal
- `getPost(postId)`: Obtenção de post específico
- `createPost(postData)`: Criação de nova publicação
- `updatePost(postId, postData)`: Atualização de publicação
- `deletePost(postId)`: Exclusão de publicação
- `savePost(formData)`: Salvar post com arquivos

### profileService
- `getProfile()`: Obtenção de perfil do usuário
- `updateProfile(profileData)`: Atualização de informações
- `updateProfileImage(file)`: Upload de imagem de perfil
- `removeProfileImage()`: Remoção de imagem de perfil

## Upload de arquivos

O sistema suporta upload de diferentes tipos de arquivos:

- **Artigos**: PDF, DOC, DOCX
- **Notícias**: Imagens (JPG, PNG, etc.)
- **Eventos**: Imagens e dados de evento
- **Área Maker**: PDF e imagens

Implementação:
- Uso de FormData para envio multipart/form-data
- Validação de tipos e tamanhos de arquivo no frontend
- Geração de thumbnails para visualização prévia
- Manipulação assíncrona com Promises

## Sistema de chat

A funcionalidade de chat em tempo real utiliza Socket.io para:
- Comunicação instantânea entre usuários
- Criação de salas de chat privadas
- Histórico de conversas
- Notificações de mensagens

## Páginas e componentes

### Públicas
- `LandingPage.js`: Página inicial com informações sobre o projeto
- `Participe.js`: Tela de login
- `Register.js`: Cadastro de usuários
- `Sobre.js` e `FAQ.js`: Informações institucionais

### Autenticadas
- `DashboardLayout.js`: Layout principal com menu lateral
- `DashboardHome.js`: Página inicial do dashboard
- `ArticlesFeed.js`: Feed de artigos científicos
- `NewsFeed.js`: Feed de notícias
- `EventsFeed.js`: Feed de eventos
- `MakerArea.js`: Área dedicada a conteúdos educativos
- `Chat.js`: Sistema de chat entre usuários
- `Lives.js`: Página de transmissões educativas
- `Profile.js`: Perfil do usuário logado

### Administrativas
- `AdminPanel.js`: Painel de controle administrativo
- `AdminPosts.js`: Gerenciamento de publicações

## Instalação e execução

### Pré-requisitos
- Node.js (v14.0.0 ou superior)
- npm ou yarn

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cca-interconnected-ocean.git
   cd cca-interconnected-ocean
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou
   yarn start
   ```

4. Acesse no navegador:
   ```
   http://localhost:3000
   ```

## Configuração

Para conectar a aplicação ao backend, ajuste a URL da API no arquivo `src/services/api.js`:

```javascript
const API_URL = 'https://api.cca-fll.com.br'; // Substitua pela URL da sua API
```

## Construção para produção

Para gerar a versão de produção:

```bash
npm run build
# ou
yarn build
```

Isso criará uma pasta `build` com os arquivos otimizados para implantação.

## Contribuições

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido como prova de conceito para a equipe de robótica infantil da escola SESI São Luís, 2024.
