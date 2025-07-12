import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

interface AdminMessageFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function AdminMessageForm({ onSubmit, onCancel }: AdminMessageFormProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info' as 'info' | 'warning' | 'update'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      createdDate: new Date().toISOString().split('T')[0]
    };

    dispatch({ type: 'ADD_ADMIN_MESSAGE', payload: message });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          placeholder="Enter message title..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="info" className="bg-gray-800">Information</option>
          <option value="update" className="bg-gray-800">Feature Update</option>
          <option value="warning" className="bg-gray-800">Warning</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message Content
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          rows={6}
          placeholder="Enter your message content..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Send Message
        </Button>
      </div>
    </form>
  );
}