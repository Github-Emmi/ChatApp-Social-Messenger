import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SettingsPage() {
  const [form, setForm] = useState({ username: '', bio: '', email: '', profile_image: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        setForm({
          username: res.data.username,
          bio: res.data.bio || '',
          email: res.data.email || '',
          password: res.data.password || '',
          profile_image: null,
        });
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('username', form.username);
    data.append('bio', form.bio);
    data.append('email', form.email);
    data.append('password', form.password);
    if (form.profile_image) data.append('profile_image', form.profile_image);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/me/update/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          rows="3"
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, profile_image: e.target.files[0] })}
          className="w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
