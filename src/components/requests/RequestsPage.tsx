import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Clock, CheckCircle, XCircle, Trash2, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RatingForm } from './RatingForm';

export function RequestsPage() {
  const { state, dispatch } = useApp();
  const { currentUser, swapRequests, users, skills } = state;
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedSwapRequest, setSelectedSwapRequest] = useState<any>(null);

  if (!currentUser) return null;

  const myRequests = swapRequests.filter(sr => 
    sr.fromUserId === currentUser.id || sr.toUserId === currentUser.id
  );

  const sentRequests = myRequests.filter(sr => sr.fromUserId === currentUser.id);
  const receivedRequests = myRequests.filter(sr => sr.toUserId === currentUser.id);

  const getUser = (userId: string) => users.find(u => u.id === userId);
  const getSkill = (skillId: string) => skills.find(s => s.id === skillId);

  const handleAcceptRequest = (requestId: string) => {
    const request = swapRequests.find(sr => sr.id === requestId);
    if (request) {
      dispatch({
        type: 'UPDATE_SWAP_REQUEST',
        payload: { ...request, status: 'accepted', updatedDate: new Date().toISOString().split('T')[0] }
      });
    }
  };

  const handleRejectRequest = (requestId: string) => {
    const request = swapRequests.find(sr => sr.id === requestId);
    if (request) {
      dispatch({
        type: 'UPDATE_SWAP_REQUEST',
        payload: { ...request, status: 'rejected', updatedDate: new Date().toISOString().split('T')[0] }
      });
    }
  };

  const handleCompleteSwap = (request: any) => {
    setSelectedSwapRequest(request);
    setShowRatingModal(true);
  };

  const handleCancelRequest = (requestId: string) => {
    const request = swapRequests.find(sr => sr.id === requestId);
    if (request) {
      dispatch({
        type: 'UPDATE_SWAP_REQUEST',
        payload: { ...request, status: 'cancelled', updatedDate: new Date().toISOString().split('T')[0] }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'completed':
        return <Badge variant="info">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="default">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const RequestCard = ({ request, isReceived }: { request: any; isReceived: boolean }) => {
    const otherUser = getUser(isReceived ? request.fromUserId : request.toUserId);
    const offeredSkill = getSkill(request.offeredSkillId);
    const requestedSkill = getSkill(request.requestedSkillId);

    if (!otherUser || !offeredSkill || !requestedSkill) return null;

    return (
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <img
              src={otherUser.profilePhoto || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
              alt={otherUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-white">{otherUser.name}</h3>
              <p className="text-gray-400 text-sm">
                {isReceived ? 'wants to learn' : 'can teach you'} {requestedSkill.name}
              </p>
              <p className="text-gray-400 text-sm">
                {isReceived ? 'offers' : 'in exchange for'} {offeredSkill.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(request.status)}
            <p className="text-gray-500 text-xs mt-1">
              {new Date(request.createdDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {request.message && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <p className="text-gray-300 text-sm">{request.message}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-sm">
              Updated {new Date(request.updatedDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {request.status === 'pending' && isReceived && (
              <>
                <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button 
                  size="sm" 
                  variant="danger" 
                  onClick={() => handleRejectRequest(request.id)}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            )}

            {request.status === 'pending' && !isReceived && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleCancelRequest(request.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            )}

            {request.status === 'accepted' && (
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => handleCompleteSwap(request)}
              >
                <Star className="w-4 h-4 mr-1" />
                Mark Complete
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Swap Requests</h1>
        <p className="text-gray-400">Manage your skill exchange requests</p>
      </div>

      {/* Received Requests */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Received Requests ({receivedRequests.length})
        </h2>
        {receivedRequests.length > 0 ? (
          <div className="space-y-4">
            {receivedRequests.map((request) => (
              <RequestCard key={request.id} request={request} isReceived={true} />
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No requests received</h3>
              <p className="text-gray-500">When others want to learn from you, their requests will appear here.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Sent Requests */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Sent Requests ({sentRequests.length})
        </h2>
        {sentRequests.length > 0 ? (
          <div className="space-y-4">
            {sentRequests.map((request) => (
              <RequestCard key={request.id} request={request} isReceived={false} />
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No requests sent</h3>
              <p className="text-gray-500">Start browsing skills to send your first swap request!</p>
            </div>
          </Card>
        )}
      </div>

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => {
          setShowRatingModal(false);
          setSelectedSwapRequest(null);
        }}
        title="Rate Your Experience"
        maxWidth="lg"
      >
        {selectedSwapRequest && (
          <RatingForm
            swapRequest={selectedSwapRequest}
            onSubmit={() => {
              setShowRatingModal(false);
              setSelectedSwapRequest(null);
            }}
            onCancel={() => {
              setShowRatingModal(false);
              setSelectedSwapRequest(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}