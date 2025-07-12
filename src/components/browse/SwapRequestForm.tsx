import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';

interface SwapRequestFormProps {
  targetUserSkill: any;
  onSubmit: () => void;
  onCancel: () => void;
}

export function SwapRequestForm({ targetUserSkill, onSubmit, onCancel }: SwapRequestFormProps) {
  const { state, dispatch } = useApp();
  const { currentUser, userSkills, skills } = state;
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [message, setMessage] = useState('');

  const myOfferedSkills = userSkills.filter(us => 
    us.userId === currentUser?.id && us.type === 'offered'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !selectedSkillId) return;

    const swapRequest = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId: targetUserSkill.userId,
      offeredSkillId: selectedSkillId,
      requestedSkillId: targetUserSkill.skillId,
      status: 'pending' as const,
      message,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };

    dispatch({ type: 'CREATE_SWAP_REQUEST', payload: swapRequest });
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Target Skill Info */}
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <h3 className="font-semibold text-white mb-2">You want to learn:</h3>
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="default">{targetUserSkill.skill.category}</Badge>
          <Badge variant="info">{targetUserSkill.level}</Badge>
        </div>
        <h4 className="text-lg font-medium text-white">{targetUserSkill.skill.name}</h4>
        <p className="text-gray-400 text-sm">from {targetUserSkill.user.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What skill will you offer in return?
          </label>
          <select
            required
            value={selectedSkillId}
            onChange={(e) => setSelectedSkillId(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="">Choose a skill to offer...</option>
            {myOfferedSkills.map((userSkill) => {
              const skill = skills.find(s => s.id === userSkill.skillId);
              if (!skill) return null;
              
              return (
                <option key={userSkill.skillId} value={userSkill.skillId} className="bg-gray-800">
                  {skill.name} ({userSkill.level})
                </option>
              );
            })}
          </select>
          {myOfferedSkills.length === 0 && (
            <p className="text-yellow-400 text-sm mt-2">
              You need to add skills to your profile before requesting swaps.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            rows={4}
            placeholder="Introduce yourself and explain why you'd like to learn this skill..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={myOfferedSkills.length === 0}>
            Send Request
          </Button>
        </div>
      </form>
    </div>
  );
}