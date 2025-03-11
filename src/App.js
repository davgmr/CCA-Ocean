import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './components/LandingPage';
import Participe from './components/Participe';
import Profile from './components/Profile';
import Chat from './components/Chat';
import NewsFeed from './components/NewsFeed';
import ArticlesFeed from './components/ArticlesFeed';
import EventsFeed from './components/EventsFeed';
import MakerArea from './components/MakerArea';
import DashboardHome from './components/DashboardHome';
import Sobre from './components/Sobre';
import FAQ from './components/FAQ';
import AreaMaker from './components/AreaMaker';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Lives from './components/Lives';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/participe" element={<Participe />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/area-maker" element={<AreaMaker />} />
        
        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="news" element={<NewsFeed />} />
          <Route path="articles" element={<ArticlesFeed />} />
          <Route path="events" element={<EventsFeed />} />
          <Route path="maker" element={<MakerArea />} />
          <Route path="lives" element={<Lives />} />
        </Route>

        {/* Rota protegida do Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminRequired={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;