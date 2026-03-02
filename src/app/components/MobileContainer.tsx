import React from 'react';
import { useApp } from '../context/AppContext';

export const MobileContainer = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const { isRTL } = useApp();

  return (
    <div className={`w-full max-w-md mx-auto min-h-screen relative overflow-hidden bg-white shadow-xl flex flex-col ${className}`} style={style}>
      {children}
    </div>
  );
};
