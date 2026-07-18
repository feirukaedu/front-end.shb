import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortalSelectionPage from './pages/PortalSelectionPage';
import MainLayout from './components/MainLayout';
import ChatPage from './pages/ChatPage';
import IngestPage from './pages/IngestPage';
import BenchmarkPage from './pages/BenchmarkPage';
import ComparePage from './pages/ComparePage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortalSelectionPage />} />
        
        {/* User Role (Khối Kinh doanh) */}
        <Route path="/chat" element={<MainLayout role="user"><ChatPage /></MainLayout>} />
        <Route path="/compare" element={<MainLayout role="user"><ComparePage /></MainLayout>} />
        
        {/* Admin Role (Khối Pháp chế) */}
        <Route path="/ingest" element={<MainLayout role="admin"><IngestPage /></MainLayout>} />
        <Route path="/settings" element={<MainLayout role="admin"><SettingsPage /></MainLayout>} />
        
        {/* Judge Role (Ban giám khảo) */}
        <Route path="/benchmark" element={<MainLayout role="judge"><BenchmarkPage /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
