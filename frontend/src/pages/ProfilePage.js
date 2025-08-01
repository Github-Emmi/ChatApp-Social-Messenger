// components/UserProfile.js
import React from 'react';

export default function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600" />
      <div className="flex flex-col items-center -mt-16 pb-6">
        <img
          className="w-32 h-32 rounded-full border-4 border-white"
          src={user.profile_image || '/default-avatar.png'}
          alt={`${user.username}'s avatar`}
        />
        <h2 className="mt-2 text-2xl font-semibold">{user.username}</h2>
        <p className="mt-2 text-gray-600 text-center px-4">
          {user.bio || 'No bio yet.'}
        </p>
        <div className="flex space-x-6 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold">{user.posts_count || 0}</p>
            <p className="text-gray-500">Posts</p>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
