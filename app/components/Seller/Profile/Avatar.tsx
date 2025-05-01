'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  name: string;
  editable?: boolean;
  onAvatarChange?: () => void;
}

export default function Avatar({ src, name, editable = false, onAvatarChange }: AvatarProps) {

  

  return (
    <div className="relative">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow">
        <Image 
          src={src} 
          alt={`${name}'s avatar`}
          width={128}
          height={128}
          className="w-full h-full object-cover" 
        />
      </div>
      
      {editable && (
        <button 
          onClick={onAvatarChange}
          className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Change avatar"
        >
          <Camera size={16} />
        </button>
      )}
    </div>
  );
}