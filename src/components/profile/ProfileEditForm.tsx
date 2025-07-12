import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

interface ProfileEditFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function ProfileEditForm({ onSubmit, onCancel }: ProfileEditFormProps) {
  const { state, dispatch } = useApp();
  const { currentUser } = state;
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    location: currentUser?.location || '',
    profilePhoto: currentUser?.profilePhoto || '',
    isPublic: currentUser?.isPublic || true,
    availability: currentUser?.availability || []
  });

  const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'];

  const handleAvailabilityChange = (option: string) => {
    const newAvailability = formData.availability.includes(option)
      ? formData.availability.filter(a => a !== option)
      : [...formData.availability, option];
    
    setFormData({ ...formData, availability: newAvailability });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      ...formData
    };

    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="City, Country"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Profile Photo URL
        </label>
        <input
          type="url"
          value={formData.profilePhoto}
          onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Availability
        </label>
        <div className="grid grid-cols-2 gap-2">
          {availabilityOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.availability.includes(option)}
                onChange={() => handleAvailabilityChange(option)}
                className="w-4 h-4 text-purple-600 bg-white/5 border-white/10 rounded focus:ring-purple-500/50"
              />
              <span className="text-gray-300 text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isPublic}
            onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            className="w-4 h-4 text-purple-600 bg-white/5 border-white/10 rounded focus:ring-purple-500/50"
          />
          <span className="text-gray-300">Make my profile public</span>
        </label>
        <p className="text-gray-500 text-xs mt-1">
          Public profiles can be discovered by other users
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}