import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  variant?: 'default' | 'glass' | 'solid' | 'gradient' | 'dark' | 'premium';
}

export function Card({ children, className = '', onClick, hover = false, variant = 'dark' }: CardProps) {
  const baseClasses = 'rounded-3xl transition-all duration-500 ease-out';
  
  const variantClasses = {
    default: 'bg-white/5 backdrop-blur-sm border border-white/10',
    glass: 'bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-2xl',
    solid: 'bg-gray-800/90 border border-gray-700/50',
    gradient: 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.12]',
    dark: 'bg-gray-900/60 backdrop-blur-2xl border border-gray-700/30 shadow-2xl shadow-black/20',
    premium: 'bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-2xl border border-gray-600/20 shadow-2xl shadow-purple-500/5'
  };
  
  const hoverClasses = hover ? 'hover:bg-gray-800/80 hover:border-gray-600/40 hover:shadow-3xl hover:shadow-purple-500/10 hover:scale-[1.02] cursor-pointer transform-gpu' : '';

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${hoverClasses}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}