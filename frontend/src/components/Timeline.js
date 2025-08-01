// components/Timeline.js
import React, { useEffect, useState } from 'react';
import { fetchPosts, likePost } from '../api/api';
import { timelineSocket } from './WebSocketProvider';

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data));
    timelineSocket.onmessage = msg => {
      const { type, data } = JSON.parse(msg.data);
      if (type === 'post') setPosts(prev => [data, ...prev]);
    };
    return () => timelineSocket.close();
  }, []);

  const handleLike = id => {
    likePost(id).then(res => {
      setPosts(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, likes_count: res.data.liked ? p.likes_count + 1 : p.likes_count - 1 }
            : p
        )
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.map(post => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
        >
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 rounded-full mr-3"
              src={post.user.profile_image || '/default-avatar.png'}
              alt={post.user.username}
            />
            <div>
              <p className="font-semibold">{post.user.username}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="mb-3">{post.text}</p>
          {post.image && (
            <img
              src={post.image}
              alt="media"
              className="w-full rounded-md mb-3"
            />
          )}
          <div className="flex items-center space-x-6 text-gray-600">
            <button
              className="flex items-center space-x-1"
              onClick={() => handleLike(post.id)}
            >
              <span>❤️</span>
              <span>{post.likes_count}</span>
            </button>
            <button className="flex items-center space-x-1">
              <span>💬</span>
              <span>{post.comments_count}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
