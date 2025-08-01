import React, { useState } from 'react';
import { likePost, commentPost } from '../api/api';
import { FiHeart, FiMessageCircle, FiX } from 'react-icons/fi';

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = async () => {
    try {
      await likePost(post.id);

      // Optionally broadcast via WebSocket
      const ws = new WebSocket('ws://localhost:8001/ws/notifications/');
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'like',
          post_id: post.id,
        }));
        ws.close();
      };
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.comment.value.trim();
    if (!text) return;

    try {
      const res = await commentPost(post.id, text);
      setComments(prev => [...prev, res.data]);
      e.target.reset();
    } catch (err) {
      alert('Failed to comment');
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm border relative">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={post.user.profile_image || 'https://via.placeholder.com/40'}
            alt={post.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{post.user.username}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {post.text && <p className="mb-3">{post.text}</p>}

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            onClick={() => setShowImageModal(true)}
            className="w-full rounded mb-3 max-h-96 object-cover cursor-pointer hover:brightness-90"
          />
        )}

        <div className="flex items-center gap-5 text-gray-600">
          <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-500">
            <FiHeart />
            <span>{post.likes_count}</span>
          </button>
          <button
            onClick={() => setShowComments(prev => !prev)}
            className="flex items-center gap-1 hover:text-blue-500"
          >
            <FiMessageCircle />
            <span>{comments.length}</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-4 space-y-3 text-sm">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="border-l-2 border-gray-200 pl-3">
                  <p className="text-gray-800 font-medium">{c.user.username}</p>
                  <p className="text-gray-600">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No comments yet.</p>
            )}

            <form onSubmit={handleCommentSubmit} className="mt-2">
              <input
                type="text"
                name="comment"
                placeholder="Write a comment..."
                className="w-full border rounded px-3 py-1 text-sm focus:outline-none"
              />
            </form>
          </div>
        )}
      </div>

      {showImageModal && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            <FiX />
          </button>
          <img src={post.image} alt="Modal" className="max-h-[80vh] rounded" />
        </div>
      )}
    </>
  );
}
