import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RatingFormProps {
  swapRequest: any;
  onSubmit: () => void;
  onCancel: () => void;
}

export function RatingForm({ swapRequest, onSubmit, onCancel }: RatingFormProps) {
  const { state, dispatch } = useApp();
  const { currentUser, users } = state;
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const otherUserId = swapRequest.fromUserId === currentUser?.id ? 
    swapRequest.toUserId : swapRequest.fromUserId;
  const otherUser = users.find(u => u.id === otherUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !otherUser) return;

    // Create rating
    const newRating = {
      id: Date.now().toString(),
      swapRequestId: swapRequest.id,
      fromUserId: currentUser.id,
      toUserId: otherUserId,
      rating,
      feedback,
      createdDate: new Date().toISOString().split('T')[0]
    };

    dispatch({ type: 'ADD_RATING', payload: newRating });

    // Update swap request status to completed
    dispatch({
      type: 'UPDATE_SWAP_REQUEST',
      payload: { 
        ...swapRequest, 
        status: 'completed', 
        updatedDate: new Date().toISOString().split('T')[0] 
      }
    });

    // Update other user's rating and total swaps
    const allRatings = [...state.ratings, newRating];
    const userRatings = allRatings.filter(r => r.toUserId === otherUserId);
    const averageRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        ...otherUser,
        rating: averageRating,
        totalSwaps: otherUser.totalSwaps + 1
      }
    });

    // Update current user's total swaps
    if (currentUser) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          ...currentUser,
          totalSwaps: currentUser.totalSwaps + 1
        }
      });
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          How was your experience with {otherUser?.name}?
        </h3>
        <p className="text-gray-400 text-sm">
          Your feedback helps build a better community
        </p>
      </div>

      <div className="text-center">
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Rating
        </label>
        <div className="flex items-center justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 transition-colors"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-2">
          {rating} out of 5 stars
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Feedback (Optional)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          rows={4}
          placeholder="Share your experience with the community..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Rating
        </Button>
      </div>
    </form>
  );
}