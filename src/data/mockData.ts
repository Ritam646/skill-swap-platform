import { User, Skill, UserSkill, SwapRequest, Rating, AdminMessage } from '../types';

export const mockData = {
  users: [
    {
      id: '1',
      name: 'Ritam Singh',
      email: 'ritam@example.com',
      location: 'Mumbai, India',
      profilePhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      isPublic: true,
      availability: ['Weekends', 'Evenings'],
      rating: 4.8,
      totalSwaps: 12,
      isAdmin: false,
      isBanned: false,
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      location: 'San Francisco, USA',
      profilePhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      isPublic: true,
      availability: ['Weekdays', 'Mornings'],
      rating: 4.9,
      totalSwaps: 8,
      isAdmin: false,
      isBanned: false,
      joinedDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      location: 'Barcelona, Spain',
      profilePhoto: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      isPublic: true,
      availability: ['Evenings', 'Weekends'],
      rating: 4.7,
      totalSwaps: 15,
      isAdmin: false,
      isBanned: false,
      joinedDate: '2024-01-05'
    },
    {
      id: 'admin',
      name: 'Admin User',
      email: 'admin@skillswap.com',
      location: 'Global',
      isPublic: false,
      availability: ['24/7'],
      rating: 5.0,
      totalSwaps: 0,
      isAdmin: true,
      isBanned: false,
      joinedDate: '2024-01-01'
    }
  ] as User[],

  skills: [
    { id: '1', name: 'React Development', category: 'Programming', level: 'Intermediate', description: 'Building modern web applications with React' },
    { id: '2', name: 'Python Programming', category: 'Programming', level: 'Advanced', description: 'Backend development and data science with Python' },
    { id: '3', name: 'UI/UX Design', category: 'Design', level: 'Advanced', description: 'User interface and experience design' },
    { id: '4', name: 'Photoshop', category: 'Design', level: 'Expert', description: 'Digital image editing and manipulation' },
    { id: '5', name: 'Excel Advanced', category: 'Business', level: 'Expert', description: 'Advanced Excel functions and data analysis' },
    { id: '6', name: 'Spanish Language', category: 'Language', level: 'Intermediate', description: 'Conversational Spanish speaking and writing' },
    { id: '7', name: 'Guitar Playing', category: 'Music', level: 'Advanced', description: 'Acoustic and electric guitar techniques' },
    { id: '8', name: 'Digital Marketing', category: 'Marketing', level: 'Intermediate', description: 'Social media and content marketing strategies' },
    { id: '9', name: 'Machine Learning', category: 'Programming', level: 'Advanced', description: 'ML algorithms and data science applications' },
    { id: '10', name: 'Photography', category: 'Creative', level: 'Intermediate', description: 'Portrait and landscape photography techniques' }
  ] as Skill[],

  userSkills: [
    { userId: '1', skillId: '1', type: 'offered', level: 'Advanced', description: 'Can teach React hooks, context, and modern patterns' },
    { userId: '1', skillId: '2', type: 'wanted', level: 'Beginner', description: 'Want to learn Python basics for web development' },
    { userId: '1', skillId: '8', type: 'wanted', level: 'Intermediate', description: 'Looking to improve digital marketing skills' },
    
    { userId: '2', skillId: '3', type: 'offered', level: 'Expert', description: 'Professional UI/UX designer with 5+ years experience' },
    { userId: '2', skillId: '4', type: 'offered', level: 'Advanced', description: 'Advanced Photoshop techniques for web design' },
    { userId: '2', skillId: '1', type: 'wanted', level: 'Intermediate', description: 'Want to learn React to collaborate better with developers' },
    
    { userId: '3', skillId: '2', type: 'offered', level: 'Expert', description: 'Senior Python developer specializing in Django and FastAPI' },
    { userId: '3', skillId: '9', type: 'offered', level: 'Advanced', description: 'Machine learning engineer with focus on computer vision' },
    { userId: '3', skillId: '6', type: 'offered', level: 'Expert', description: 'Native Spanish speaker, can teach all levels' },
    { userId: '3', skillId: '7', type: 'wanted', level: 'Beginner', description: 'Complete beginner wanting to learn guitar' }
  ] as UserSkill[],

  swapRequests: [
    {
      id: '1',
      fromUserId: '1',
      toUserId: '2',
      offeredSkillId: '1',
      requestedSkillId: '3',
      status: 'pending',
      message: 'Hi Sarah! I would love to learn UI/UX design from you in exchange for React development training.',
      createdDate: '2024-03-10',
      updatedDate: '2024-03-10'
    },
    {
      id: '2',
      fromUserId: '3',
      toUserId: '1',
      offeredSkillId: '2',
      requestedSkillId: '1',
      status: 'accepted',
      message: 'Hey Ritam! Interested in swapping Python knowledge for React skills.',
      createdDate: '2024-03-08',
      updatedDate: '2024-03-09'
    },
    {
      id: '3',
      fromUserId: '2',
      toUserId: '3',
      offeredSkillId: '4',
      requestedSkillId: '6',
      status: 'completed',
      message: 'Would love to exchange Photoshop techniques for Spanish lessons!',
      createdDate: '2024-02-15',
      updatedDate: '2024-03-01'
    }
  ] as SwapRequest[],

  ratings: [
    {
      id: '1',
      swapRequestId: '3',
      fromUserId: '2',
      toUserId: '3',
      rating: 5,
      feedback: 'Alex was an amazing Spanish teacher! Very patient and organized lessons well.',
      createdDate: '2024-03-02'
    },
    {
      id: '2',
      swapRequestId: '3',
      fromUserId: '3',
      toUserId: '2',
      rating: 5,
      feedback: 'Sarah taught me advanced Photoshop techniques that I use daily now. Highly recommended!',
      createdDate: '2024-03-02'
    }
  ] as Rating[],

  adminMessages: [
    {
      id: '1',
      title: 'Welcome to SkillSwap!',
      content: 'Thank you for joining our community. Start by adding your skills and browsing what others offer.',
      type: 'info',
      createdDate: '2024-03-01'
    },
    {
      id: '2',
      title: 'New Feature: Advanced Search',
      content: 'You can now filter skills by category, level, and location for better matches.',
      type: 'update',
      createdDate: '2024-03-05'
    }
  ] as AdminMessage[]
};