import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load posts initially
    fetchPosts().then(res => setPosts(res.data));

    // WebSocket for real-time posts
    const socket = new WebSocket('ws://localhost:8001/ws/timeline/');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'send_post') {
        setPosts(prev => [data.data, ...prev]);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-4 pb-6">
      {/* ✅ Post Creation Form */}
      <PostForm onPosted={(newPost) => setPosts(prev => [newPost, ...prev])} />

      {/* ✅ Feed Heading */}
      <h2 className="text-xl font-bold mb-2">Latest Posts</h2>

      {/* ✅ Display Posts */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
