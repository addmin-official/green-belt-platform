import React from 'react';
import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  status,
}) => {
  const getInitials = (n: string) => {
    return n.trim().split(' ').slice(0, 2).map((x) => x[0]).join('').toUpperCase();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-[11px]';
      case 'lg':
        return 'w-14 h-14 text-sm';
      case 'md':
      default:
        return 'w-10 h-10 text-xs';
    }
  };

  return (
    <div className="relative inline-flex font-mono select-none">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`rounded-full object-cover border border-slate-700 ${getSizeClasses()}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div 
          className={`rounded-full border border-slate-700 bg-slate-900 text-[#E0A96D] font-bold flex items-center justify-center ${getSizeClasses()}`}
        >
          {getInitials(name)}
        </div>
      )}
      
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-[#0D1B2A] ${
            status === 'online' 
              ? 'bg-[#52B788]' 
              : status === 'busy' 
                ? 'bg-amber-500' 
                : 'bg-slate-500'
          }`} 
        />
      )}
    </div>
  );
};

export default Avatar;
