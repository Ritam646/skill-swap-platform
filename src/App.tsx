import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthForm } from './components/auth/AuthForm';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProfilePage } from './components/profile/ProfilePage';
import { BrowseSkills } from './components/browse/BrowseSkills';
import { RequestsPage } from './components/requests/RequestsPage';
import { ConnectionsPage } from './components/connections/ConnectionsPage';
import { AdminPage } from './components/admin/AdminPage';

function AppContent() {
  const { state } = useApp();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!state.currentUser) {
    return <AuthForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'profile':
        return <ProfilePage />;
      case 'browse':
        return <BrowseSkills />;
      case 'requests':
        return <RequestsPage />;
      case 'connections':
        return <ConnectionsPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;