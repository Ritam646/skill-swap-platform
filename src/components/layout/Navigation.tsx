import React from 'react';
import { Home, Search, Users, MessageSquare, Settings, Shield, LogOut, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { state, dispatch } = useApp();
  const { currentUser } = state;

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'browse', label: 'Browse Skills', icon: Search },
    { id: 'connections', label: 'Connections', icon: Users },
    { id: 'requests', label: 'Requests', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  if (currentUser?.isAdmin) {
    navigationItems.push({ id: 'admin', label: 'Admin', icon: Shield });
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null });
  };

  return (
    <nav className="bg-gray-950/80 backdrop-blur-2xl border-r border-gray-800/50 h-screen w-80 p-8 flex flex-col shadow-2xl">
      <div className="mb-16">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-lg shadow-purple-500/25">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">SkillSwap</h1>
            <p className="text-purple-300 text-sm font-semibold">Next-Gen Exchange</p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ul className="space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-5 px-6 py-5 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600/40 to-violet-600/40 text-white border border-purple-500/40 shadow-xl shadow-purple-500/20' 
                      : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-purple-300' : 'group-hover:scale-110 group-hover:text-purple-400'}`} />
                  <span className="font-semibold text-base">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-gray-800/50 pt-8">
        <div className="flex items-center space-x-4 mb-8 p-6 bg-gray-900/60 rounded-2xl border border-gray-700/30">
          <img 
            src={currentUser?.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'} 
            alt={currentUser?.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/30"
          />
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">{currentUser?.name}</p>
            <p className="text-gray-400 text-sm">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-5 px-6 py-5 text-gray-300 hover:text-white hover:bg-red-500/10 rounded-2xl transition-all duration-300 group"
        >
          <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </nav>
  );
}