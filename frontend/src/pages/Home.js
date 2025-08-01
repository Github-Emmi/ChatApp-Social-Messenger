import React from 'react';
import NotificationPanel from '../components/NotificationPanel';
import Timeline from '../components/Timeline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NotificationPanel />
      <main className="pt-6 px-4">
        <Timeline />
      </main>
    </div>
  );
}
