// components/NotificationPanel.js
import React, { useEffect, useState } from 'react';
import { notificationSocket } from './WebSocketProvider';

export default function NotificationPanel() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    notificationSocket.onmessage = msg => {
      const { type, data } = JSON.parse(msg.data);
      if (type === 'notification') {
        setNotes(prev => [
          { ...data, id: Date.now() },
          ...prev
        ]);
      }
    };
    return () => notificationSocket.close();
  }, []);

  const dismiss = id => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notes.map(n => (
        <div
          key={n.id}
          className="bg-white shadow-md border border-gray-200 rounded-lg p-3 max-w-xs hover:shadow-lg transition"
        >
          <p className="text-sm">
            <strong>{n.actor}</strong> {n.verb}
          </p>
          <button
            onClick={() => dismiss(n.id)}
            className="text-gray-400 text-xs mt-1 hover:text-gray-600"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
