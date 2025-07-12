import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'gradient' | 'premium' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  className = '',
  type = 'button',
  fullWidth = false
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform-gpu';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 text-white hover:from-purple-700 hover:via-purple-600 hover:to-violet-700 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105',
    secondary: 'bg-gray-800/80 text-white border border-gray-600/40 hover:bg-gray-700/80 hover:border-gray-500/60 backdrop-blur-sm hover:scale-105 shadow-lg',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 hover:scale-105 shadow-lg shadow-red-500/25',
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-800/60 hover:scale-105',
    outline: 'border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:scale-105',
    gradient: 'bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 text-white hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600 shadow-xl hover:shadow-purple-500/30 hover:scale-105',
    premium: 'bg-gradient-to-r from-purple-600 via-pink-500 to-violet-600 text-white hover:from-purple-700 hover:via-pink-600 hover:to-violet-700 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105',
    dark: 'bg-gray-900/90 text-gray-200 border border-gray-700/50 hover:bg-gray-800/90 hover:border-gray-600/60 hover:text-white hover:scale-105 shadow-lg'
  };
  
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  return (
    <button
      type={type}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}