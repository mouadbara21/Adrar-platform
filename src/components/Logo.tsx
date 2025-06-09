
import React from 'react';
import { Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  color = 'text-easyhike-green', 
  withText = true 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${color}`}>
      <Mountain className={`${sizes[size]} stroke-current`} />
      {withText && (
        <span className={`font-bold ${textSizes[size]}`}>
          EasyHike
        </span>
      )}
    </Link>
  );
};

export default Logo;
