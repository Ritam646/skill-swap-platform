import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Plus, Edit, Trash2, MapPin, Clock, Star, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillForm } from './SkillForm';
import { ProfileEditForm } from './ProfileEditForm';

export function ProfilePage() {
  const { state, dispatch } = useApp();
  const { currentUser, skills, userSkills } = state;
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  if (!currentUser) return null;

  const userOfferedSkills = userSkills.filter(us => us.userId === currentUser.id && us.type === 'offered');
  const userWantedSkills = userSkills.filter(us => us.userId === currentUser.id && us.type === 'wanted');

  const getSkillById = (skillId: string) => skills.find(s => s.id === skillId);

  const handleRemoveSkill = (skillId: string, type: 'offered' | 'wanted') => {
    dispatch({
      type: 'REMOVE_USER_SKILL',
      payload: { userId: currentUser.id, skillId, type }
    });
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-6">
          <img
            src={currentUser.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/30"
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{currentUser.name}</h1>
            <div className="flex items-center space-x-4 text-gray-400 mb-4">
              {currentUser.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{currentUser.rating.toFixed(1)} rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{currentUser.totalSwaps} swaps</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant={currentUser.isPublic ? 'success' : 'warning'}>
                {currentUser.isPublic ? 'Public Profile' : 'Private Profile'}
              </Badge>
              {currentUser.isAdmin && <Badge variant="info">Admin</Badge>}
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Available: {currentUser.availability.join(', ')}</span>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowProfileEdit(true)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Skills Offered */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Skills I Offer</h2>
          <Button 
            onClick={() => {
              setEditingSkill({ type: 'offered' });
              setShowSkillForm(true);
            }}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        
        {userOfferedSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userOfferedSkills.map((userSkill) => {
              const skill = getSkillById(userSkill.skillId);
              if (!skill) return null;
              
              return (
                <div key={`${userSkill.skillId}-offered`} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(userSkill.skillId, 'offered')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="default">{skill.category}</Badge>
                    <Badge variant="info">{userSkill.level}</Badge>
                  </div>
                  <p className="text-gray-400 text-sm">{userSkill.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Plus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No skills offered yet</h3>
            <p className="text-gray-500 text-sm mb-4">Share your expertise with the community</p>
            <Button onClick={() => {
              setEditingSkill({ type: 'offered' });
              setShowSkillForm(true);
            }}>
              Add Your First Skill
            </Button>
          </div>
        )}
      </Card>

      {/* Skills Wanted */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Skills I Want to Learn</h2>
          <Button 
            onClick={() => {
              setEditingSkill({ type: 'wanted' });
              setShowSkillForm(true);
            }}
            size="sm"
            variant="secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        
        {userWantedSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userWantedSkills.map((userSkill) => {
              const skill = getSkillById(userSkill.skillId);
              if (!skill) return null;
              
              return (
                <div key={`${userSkill.skillId}-wanted`} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(userSkill.skillId, 'wanted')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="default">{skill.category}</Badge>
                    <Badge variant="warning">{userSkill.level}</Badge>
                  </div>
                  <p className="text-gray-400 text-sm">{userSkill.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Plus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No learning goals yet</h3>
            <p className="text-gray-500 text-sm mb-4">Tell others what you'd like to learn</p>
            <Button 
              variant="secondary"
              onClick={() => {
                setEditingSkill({ type: 'wanted' });
                setShowSkillForm(true);
              }}
            >
              Add Learning Goal
            </Button>
          </div>
        )}
      </Card>

      {/* Modals */}
      <Modal
        isOpen={showSkillForm}
        onClose={() => {
          setShowSkillForm(false);
          setEditingSkill(null);
        }}
        title={`Add ${editingSkill?.type === 'offered' ? 'Skill Offering' : 'Learning Goal'}`}
        maxWidth="lg"
      >
        <SkillForm
          type={editingSkill?.type}
          onSubmit={() => {
            setShowSkillForm(false);
            setEditingSkill(null);
          }}
          onCancel={() => {
            setShowSkillForm(false);
            setEditingSkill(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        title="Edit Profile"
        maxWidth="lg"
      >
        <ProfileEditForm
          onSubmit={() => setShowProfileEdit(false)}
          onCancel={() => setShowProfileEdit(false)}
        />
      </Modal>
    </div>
  );
}