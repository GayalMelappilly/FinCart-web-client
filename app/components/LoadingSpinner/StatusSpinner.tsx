'use client'

import React from 'react';

const StatusSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-5 w-5">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default StatusSpinner;