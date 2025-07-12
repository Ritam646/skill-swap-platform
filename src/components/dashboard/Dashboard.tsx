import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, TrendingUp, Users, MessageSquare, Star, Zap, ArrowRight, Activity, Target, Award, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

export function Dashboard({ onPageChange }: DashboardProps) {
  const { state } = useApp();
  const { currentUser, swapRequests, userSkills, ratings } = state;

  if (!currentUser) return null;

  const userOfferedSkills = userSkills.filter(us => us.userId === currentUser.id && us.type === 'offered');
  const userWantedSkills = userSkills.filter(us => us.userId === currentUser.id && us.type === 'wanted');
  const userSwapRequests = swapRequests.filter(sr => sr.fromUserId === currentUser.id || sr.toUserId === currentUser.id);
  const pendingRequests = userSwapRequests.filter(sr => sr.status === 'pending');
  const activeSwaps = userSwapRequests.filter(sr => sr.status === 'accepted');

  const recentActivity = [
    ...swapRequests
      .filter(sr => sr.fromUserId === currentUser.id || sr.toUserId === currentUser.id)
      .slice(-3)
      .map(sr => ({
        type: 'swap',
        content: `Swap request ${sr.status}`,
        date: sr.updatedDate,
        status: sr.status
      })),
    ...ratings
      .filter(r => r.toUserId === currentUser.id)
      .slice(-2)
      .map(r => ({
        type: 'rating',
        content: `Received ${r.rating}/5 rating`,
        date: r.createdDate,
        status: 'positive'
      }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Welcome back, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-xl text-gray-300 font-medium">Ready to exchange skills and expand your knowledge?</p>
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span>{userOfferedSkills.length} skills offered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-400" />
                <span>{userWantedSkills.length} learning goals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>Available: {currentUser.availability.join(', ')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="dark" size="lg" onClick={() => onPageChange('profile')}>
              Manage Profile
            </Button>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-700/50">
              <span className="text-white font-semibold">Logout</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card variant="premium" className="text-center group hover:scale-105 transition-all duration-500 p-8">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">{activeSwaps.length}</h3>
            <p className="text-gray-300 font-semibold text-lg">Active Swaps</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"></div>
          </Card>

          <Card variant="premium" className="text-center group hover:scale-105 transition-all duration-500 p-8">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <MessageSquare className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">{pendingRequests.length}</h3>
            <p className="text-gray-300 font-semibold text-lg">Pending Requests</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </Card>

          <Card variant="premium" className="text-center group hover:scale-105 transition-all duration-500 p-8">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">{currentUser.rating.toFixed(1)}</h3>
            <p className="text-gray-300 font-semibold text-lg">Rating</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
          </Card>

          <Card variant="premium" className="text-center group hover:scale-105 transition-all duration-500 p-8">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <Users className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-3">{currentUser.totalSwaps}</h3>
            <p className="text-gray-300 font-semibold text-lg">Connections</p>
            <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card variant="premium" hover onClick={() => onPageChange('profile')} className="group p-10">
            <div className="flex items-start space-x-8 mb-8">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                <Plus className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Add New Skill</h3>
                <p className="text-gray-400 leading-relaxed text-lg">Share your expertise with the community</p>
              </div>
            </div>
            <Button variant="premium" fullWidth size="lg" className="group-hover:shadow-2xl">
              Create Skill
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Card>

          <Card variant="premium" hover onClick={() => onPageChange('browse')} className="group p-10">
            <div className="flex items-start space-x-8 mb-8">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-10 h-10 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Browse Skills</h3>
                <p className="text-gray-400 leading-relaxed text-lg">Discover new skills to learn</p>
              </div>
            </div>
            <Button variant="dark" fullWidth size="lg" className="group-hover:bg-gray-700/90">
              Explore
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Card>

          <Card variant="premium" hover onClick={() => onPageChange('connections')} className="group p-10">
            <div className="flex items-start space-x-8 mb-8">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                <Users className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">Connect</h3>
                <p className="text-gray-400 leading-relaxed text-lg">Network with skilled professionals</p>
              </div>
            </div>
            <Button variant="dark" fullWidth size="lg" className="group-hover:bg-gray-700/90">
              Find People
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Card>
        </div>

        {/* Enhanced Recent Activity */}
        <Card variant="premium" className="p-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl">
                <Activity className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Recent Activity</h2>
            </div>
            <Button variant="ghost" size="lg" onClick={() => onPageChange('requests')}>
              View All
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-8 p-8 bg-gray-900/40 rounded-2xl border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300">
                  <div className={`w-4 h-4 rounded-full ${
                    activity.status === 'completed' || activity.status === 'positive' ? 'bg-green-400' :
                    activity.status === 'accepted' ? 'bg-blue-400' :
                    activity.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-lg">{activity.content}</p>
                    <p className="text-gray-400 text-base mt-2">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-3xl mx-auto mb-8">
                <Zap className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-300 mb-6">No Activity Yet</h3>
              <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Start your skill exchange journey by adding your first skill or browsing available skills.
              </p>
              <Button variant="premium" size="xl" onClick={() => onPageChange('profile')}>
                Add Your First Skill
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}