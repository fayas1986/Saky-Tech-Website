import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M 75 25 L 50 0" stroke="#005eb8" strokeWidth="14" strokeLinecap="round" />
    <path d="M 50 0 L 25 25" stroke="#e31837" strokeWidth="14" strokeLinecap="round" />
    <path d="M 25 25 L 75 75" stroke="#005eb8" strokeWidth="14" strokeLinecap="round" />
    <path d="M 75 75 L 50 100" stroke="#e31837" strokeWidth="14" strokeLinecap="round" />
    <path d="M 50 100 L 25 75" stroke="#005eb8" strokeWidth="14" strokeLinecap="round" />
  </svg>
);
