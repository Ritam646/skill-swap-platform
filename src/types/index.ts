export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  profilePhoto?: string;
  isPublic: boolean;
  availability: string[];
  rating: number;
  totalSwaps: number;
  isAdmin: boolean;
  isBanned: boolean;
  joinedDate: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
}

export interface UserSkill {
  userId: string;
  skillId: string;
  type: 'offered' | 'wanted';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  offeredSkillId: string;
  requestedSkillId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message: string;
  createdDate: string;
  updatedDate: string;
}

export interface Rating {
  id: string;
  swapRequestId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  feedback: string;
  createdDate: string;
}

export interface AdminMessage {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'update';
  createdDate: string;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  skills: Skill[];
  userSkills: UserSkill[];
  swapRequests: SwapRequest[];
  ratings: Rating[];
  adminMessages: AdminMessage[];
}