import React, { useState } from 'react';
import axios from 'axios';

export default function NewPostForm({ onPostCreated }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) return;

    const formData = new FormData();
    formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('access');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setText('');
      setImage(null);
      onPostCreated && onPostCreated(res.data);
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Post
      </button>
    </form>
  );
}
