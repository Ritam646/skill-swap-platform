import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

interface SkillFormProps {
  type: 'offered' | 'wanted';
  onSubmit: () => void;
  onCancel: () => void;
}

export function SkillForm({ type, onSubmit, onCancel }: SkillFormProps) {
  const { state, dispatch } = useApp();
  const { currentUser, skills } = state;
  const [formData, setFormData] = useState({
    skillId: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !formData.skillId) return;

    const userSkill = {
      userId: currentUser.id,
      skillId: formData.skillId,
      type,
      level: formData.level,
      description: formData.description
    };

    dispatch({ type: 'ADD_USER_SKILL', payload: userSkill });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Skill
        </label>
        <select
          required
          value={formData.skillId}
          onChange={(e) => setFormData({ ...formData, skillId: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="">Choose a skill...</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id} className="bg-gray-800">
              {skill.name} ({skill.category})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Level
        </label>
        <select
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="Beginner" className="bg-gray-800">Beginner</option>
          <option value="Intermediate" className="bg-gray-800">Intermediate</option>
          <option value="Advanced" className="bg-gray-800">Advanced</option>
          <option value="Expert" className="bg-gray-800">Expert</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          rows={4}
          placeholder={type === 'offered' ? 
            "Describe what you can teach and your teaching approach..." : 
            "Explain what you want to learn and your current level..."
          }
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add {type === 'offered' ? 'Skill' : 'Learning Goal'}
        </Button>
      </div>
    </form>
  );
}