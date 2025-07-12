import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Search, Filter, MapPin, Star, Users, Target, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SwapRequestForm } from './SwapRequestForm';

export function BrowseSkills() {
  const { state } = useApp();
  const { users, skills, userSkills, currentUser } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedUserSkill, setSelectedUserSkill] = useState<any>(null);

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const offeredSkills = userSkills.filter(us => us.type === 'offered');
  
  const filteredSkills = offeredSkills.filter(userSkill => {
    const skill = skills.find(s => s.id === userSkill.skillId);
    const user = users.find(u => u.id === userSkill.userId);
    
    if (!skill || !user || !user.isPublic || user.isBanned || user.id === currentUser?.id) {
      return false;
    }

    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userSkill.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesLevel = selectedLevel === '' || selectedLevel === 'All' || userSkill.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleRequestSwap = (userSkill: any) => {
    setSelectedUserSkill(userSkill);
    setShowSwapModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Browse Skills
            </h1>
            <p className="text-xl text-gray-300 font-medium">Discover new skills to learn from our community</p>
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span>{filteredSkills.length} skills available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>{new Set(filteredSkills.map(fs => fs.userId)).size} experts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <Card variant="premium" className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 text-lg"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 text-lg"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 text-lg"
            >
              {levels.map(level => (
                <option key={level} value={level === 'All' ? '' : level} className="bg-gray-800">
                  {level}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Enhanced Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((userSkill) => {
              const skill = skills.find(s => s.id === userSkill.skillId);
              const user = users.find(u => u.id === userSkill.userId);
              
              if (!skill || !user) return null;

              return (
                <Card key={`${userSkill.userId}-${userSkill.skillId}`} variant="premium" className="h-full p-8 hover:scale-105 transition-all duration-500">
                  <div className="flex items-start space-x-6 mb-6">
                    <img
                      src={user.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                      alt={user.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/30"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-xl mb-2">{skill.name}</h3>
                      <p className="text-gray-300 font-medium">{user.name}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="default" size="md">{skill.category}</Badge>
                      <Badge variant="info" size="md">{userSkill.level}</Badge>
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed">{userSkill.description}</p>

                    <div className="flex items-center justify-between text-base text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="font-medium">{user.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">{user.totalSwaps} swaps</span>
                      </div>
                    </div>

                    {user.location && (
                      <div className="flex items-center space-x-2 text-gray-400 text-base">
                        <MapPin className="w-5 h-5" />
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="premium"
                    className="w-full" 
                    size="lg"
                    onClick={() => handleRequestSwap({ ...userSkill, skill, user })}
                  >
                    Request Swap
                  </Button>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card variant="premium" className="p-20">
            <div className="text-center">
              <Search className="w-20 h-20 text-gray-500 mx-auto mb-8" />
              <h3 className="text-3xl font-bold text-gray-300 mb-4">No skills found</h3>
              <p className="text-gray-400 text-xl">Try adjusting your search criteria or check back later for new skills.</p>
            </div>
          </Card>
        )}

        {/* Swap Request Modal */}
        <Modal
          isOpen={showSwapModal}
          onClose={() => {
            setShowSwapModal(false);
            setSelectedUserSkill(null);
          }}
          title="Request Skill Swap"
          maxWidth="lg"
        >
          {selectedUserSkill && (
            <SwapRequestForm
              targetUserSkill={selectedUserSkill}
              onSubmit={() => {
                setShowSwapModal(false);
                setSelectedUserSkill(null);
              }}
              onCancel={() => {
                setShowSwapModal(false);
                setSelectedUserSkill(null);
              }}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}