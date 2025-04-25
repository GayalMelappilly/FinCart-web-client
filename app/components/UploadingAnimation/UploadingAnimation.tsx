import { useState, useEffect } from 'react';

export default function LoadingAnimation() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50 rounded-lg">
      <div className="relative w-16 h-16 mb-4">
        {/* Circular spinner with growing arc */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <circle
            className="text-blue-500"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
            strokeDasharray={`${2.64 * Math.PI * 42 * progress/100} ${2.64 * Math.PI * 42}`}
            strokeDashoffset={2.64 * Math.PI * 42 * 0.25}
          />
        </svg>
        
        {/* Image icon in center */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      {/* Progress text */}
      <div className="text-sm font-medium text-gray-700">
        {progress}% Uploading...
      </div>
      
      {/* Progress bar */}
      <div className="w-3/4 mt-2 bg-gray-200 rounded-full h-1.5">
        <div 
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}