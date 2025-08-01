import React, { useState } from 'react';
import axios from 'axios';

export default function PostForm({ onPosted }) {
  const [form, setForm] = useState({ text: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', form.text);
    if (form.image) formData.append('image', form.image);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onPosted?.(res.data); // optional callback
      setForm({ text: '', image: null });
    } catch (err) {
      alert('Post failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm border mb-6">
      <textarea
        rows="3"
        placeholder="Share your thoughts..."
        className="w-full border p-2 mb-3 rounded"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      ></textarea>

      <input
        type="file"
        accept="image/*"
        className="mb-3"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Post
      </button>
    </form>
  );
}
