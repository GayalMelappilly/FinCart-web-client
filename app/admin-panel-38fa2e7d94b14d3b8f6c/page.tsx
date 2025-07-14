'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('@/app/components/admin/Panel'), {
  ssr: false,
});

const Page = () => {
  return (
    <div>
      <AdminPanel />
    </div>
  );
};

export default Page;
