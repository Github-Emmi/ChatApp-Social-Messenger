import React from 'react';
import { Outlet } from 'react-router-dom';
import StickyHeader from '../components/StickyHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <StickyHeader />
      <div className="pt-4 px-4">
        <Outlet />
      </div>
    </div>
  );
}
