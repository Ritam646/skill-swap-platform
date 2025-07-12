import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { 
  Users, 
  MessageSquare, 
  Shield, 
  AlertTriangle, 
  Download,
  Send,
  Ban,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminMessageForm } from './AdminMessageForm';

export function AdminPage() {
  const { state, dispatch } = useApp();
  const { users, swapRequests, ratings, adminMessages, currentUser } = state;
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!currentUser?.isAdmin) {
    return (
      <div className="p-8">
        <Card>
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-400 mb-2">Access Denied</h3>
            <p className="text-gray-500">You don't have permission to access this page.</p>
          </div>
        </Card>
      </div>
    );
  }

  const totalUsers = users.length;
  const bannedUsers = users.filter(u => u.isBanned).length;
  const pendingSwaps = swapRequests.filter(sr => sr.status === 'pending').length;
  const completedSwaps = swapRequests.filter(sr => sr.status === 'completed').length;

  const handleBanUser = (userId: string) => {
    if (window.confirm('Are you sure you want to ban this user?')) {
      dispatch({ type: 'BAN_USER', payload: userId });
    }
  };

  const generateReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      userStats: {
        total: totalUsers,
        banned: bannedUsers,
        active: totalUsers - bannedUsers
      },
      swapStats: {
        pending: pendingSwaps,
        completed: completedSwaps,
        total: swapRequests.length
      },
      ratings: ratings.length
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skillswap-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'swaps', label: 'Swaps', icon: MessageSquare },
    { id: 'messages', label: 'Messages', icon: Send }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Platform management and monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setShowMessageForm(true)}>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button variant="secondary" onClick={generateReport}>
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Card>
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedTab === tab.id
                    ? 'bg-purple-600/20 text-purple-300'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">{totalUsers}</h3>
              <p className="text-gray-400 text-sm">Total Users</p>
            </Card>

            <Card className="text-center">
              <Ban className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">{bannedUsers}</h3>
              <p className="text-gray-400 text-sm">Banned Users</p>
            </Card>

            <Card className="text-center">
              <MessageSquare className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">{pendingSwaps}</h3>
              <p className="text-gray-400 text-sm">Pending Swaps</p>
            </Card>

            <Card className="text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">{completedSwaps}</h3>
              <p className="text-gray-400 text-sm">Completed Swaps</p>
            </Card>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {selectedTab === 'users' && (
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">User Management</h2>
          <div className="space-y-4">
            {users.filter(u => !u.isAdmin).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-white">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={user.isBanned ? 'danger' : 'success'}>
                    {user.isBanned ? 'Banned' : 'Active'}
                  </Badge>
                  <span className="text-gray-400 text-sm">{user.totalSwaps} swaps</span>
                  {!user.isBanned && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleBanUser(user.id)}
                    >
                      <Ban className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Swaps Tab */}
      {selectedTab === 'swaps' && (
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Swap Monitoring</h2>
          <div className="space-y-4">
            {swapRequests.slice(0, 10).map((request) => {
              const fromUser = users.find(u => u.id === request.fromUserId);
              const toUser = users.find(u => u.id === request.toUserId);
              
              return (
                <div key={request.id} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white text-sm">
                        {fromUser?.name} → {toUser?.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(request.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        request.status === 'completed' ? 'success' :
                        request.status === 'pending' ? 'warning' :
                        request.status === 'accepted' ? 'info' : 'danger'
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  {request.message && (
                    <p className="text-gray-300 text-sm">{request.message}</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Messages Tab */}
      {selectedTab === 'messages' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Platform Messages</h2>
            <Button onClick={() => setShowMessageForm(true)}>
              <Send className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </div>
          <div className="space-y-4">
            {adminMessages.map((message) => (
              <div key={message.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{message.title}</h3>
                  <Badge 
                    variant={
                      message.type === 'info' ? 'info' :
                      message.type === 'warning' ? 'warning' : 'default'
                    }
                  >
                    {message.type}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">{message.content}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(message.createdDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Admin Message Modal */}
      <Modal
        isOpen={showMessageForm}
        onClose={() => setShowMessageForm(false)}
        title="Send Platform Message"
        maxWidth="lg"
      >
        <AdminMessageForm
          onSubmit={() => setShowMessageForm(false)}
          onCancel={() => setShowMessageForm(false)}
        />
      </Modal>
    </div>
  );
}