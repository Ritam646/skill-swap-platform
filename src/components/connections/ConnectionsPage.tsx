import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Search, MapPin, Star, Users, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ConnectionsPage() {
  const { state } = useApp();
  const { currentUser, users, swapRequests, ratings } = state;
  const [searchTerm, setSearchTerm] = useState('');

  if (!currentUser) return null;

  // Get users who have had successful swaps with current user
  const completedSwaps = swapRequests.filter(sr => 
    (sr.fromUserId === currentUser.id || sr.toUserId === currentUser.id) && 
    sr.status === 'completed'
  );

  const connectionUserIds = new Set([
    ...completedSwaps.map(sr => sr.fromUserId === currentUser.id ? sr.toUserId : sr.fromUserId)
  ]);

  const connections = users.filter(user => 
    connectionUserIds.has(user.id) && 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConnectionStats = (userId: string) => {
    const userSwaps = completedSwaps.filter(sr => 
      sr.fromUserId === userId || sr.toUserId === userId
    );
    const userRatings = ratings.filter(r => r.toUserId === userId);
    const averageRating = userRatings.length > 0 
      ? userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length 
      : 0;

    return {
      totalSwaps: userSwaps.length,
      rating: averageRating
    };
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Connections</h1>
          <p className="text-gray-400">People you've successfully swapped skills with</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{connections.length}</p>
          <p className="text-gray-400 text-sm">Total Connections</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
      </Card>

      {/* Connections Grid */}
      {connections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((user) => {
            const stats = getConnectionStats(user.id);
            const mutualSwaps = completedSwaps.filter(sr => 
              (sr.fromUserId === currentUser.id && sr.toUserId === user.id) ||
              (sr.fromUserId === user.id && sr.toUserId === currentUser.id)
            );

            return (
              <Card key={user.id} className="text-center">
                <img
                  src={user.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-purple-500/30"
                />
                
                <h3 className="text-lg font-semibold text-white mb-2">{user.name}</h3>
                
                {user.location && (
                  <div className="flex items-center justify-center space-x-1 text-gray-400 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white text-sm">{user.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm">{user.totalSwaps}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm">{mutualSwaps.length}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Badge variant="success" size="sm">Connected</Badge>
                  <p className="text-gray-400 text-xs">
                    {mutualSwaps.length} skill swap{mutualSwaps.length !== 1 ? 's' : ''} together
                  </p>
                </div>

                <Button variant="secondary" size="sm" className="w-full">
                  View Profile
                </Button>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No connections yet</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No connections match your search.' : 'Complete your first skill swap to start building your network!'}
            </p>
            {!searchTerm && (
              <Button>
                Browse Skills
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}