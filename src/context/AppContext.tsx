import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, Skill, UserSkill, SwapRequest, Rating, AdminMessage } from '../types';
import { mockData } from '../data/mockData';

type AppAction = 
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'ADD_USER_SKILL'; payload: UserSkill }
  | { type: 'REMOVE_USER_SKILL'; payload: { userId: string; skillId: string; type: 'offered' | 'wanted' } }
  | { type: 'CREATE_SWAP_REQUEST'; payload: SwapRequest }
  | { type: 'UPDATE_SWAP_REQUEST'; payload: SwapRequest }
  | { type: 'ADD_RATING'; payload: Rating }
  | { type: 'BAN_USER'; payload: string }
  | { type: 'ADD_ADMIN_MESSAGE'; payload: AdminMessage };

const initialState: AppState = {
  currentUser: null,
  ...mockData
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        currentUser: state.currentUser?.id === action.payload.id ? action.payload : state.currentUser
      };
    
    case 'ADD_USER_SKILL':
      return {
        ...state,
        userSkills: [...state.userSkills, action.payload]
      };
    
    case 'REMOVE_USER_SKILL':
      return {
        ...state,
        userSkills: state.userSkills.filter(us => 
          !(us.userId === action.payload.userId && 
            us.skillId === action.payload.skillId && 
            us.type === action.payload.type)
        )
      };
    
    case 'CREATE_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: [...state.swapRequests, action.payload]
      };
    
    case 'UPDATE_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: state.swapRequests.map(sr => 
          sr.id === action.payload.id ? action.payload : sr
        )
      };
    
    case 'ADD_RATING':
      return {
        ...state,
        ratings: [...state.ratings, action.payload]
      };
    
    case 'BAN_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload ? { ...user, isBanned: true } : user
        )
      };
    
    case 'ADD_ADMIN_MESSAGE':
      return {
        ...state,
        adminMessages: [...state.adminMessages, action.payload]
      };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}