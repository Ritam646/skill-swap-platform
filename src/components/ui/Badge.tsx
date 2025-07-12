import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-semibold rounded-xl';
  
  const variantClasses = {
    default: 'bg-gray-800/80 text-gray-200 border border-gray-600/40',
    success: 'bg-green-500/20 text-green-300 border border-green-500/40',
    warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40',
    danger: 'bg-red-500/20 text-red-300 border border-red-500/40',
    info: 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}