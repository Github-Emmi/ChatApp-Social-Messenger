import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import UserProfile from '../components/UserProfile';
import { fetchProfile } from '../api/api';

export default function ProfilePage() {
  const { id } = useParams();               // ✅ extract user ID from URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProfile(id)
        .then(res => setUser(res.data))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, [id]);

  if (!user) return <p className="text-center mt-8 text-gray-600">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <UserProfile user={user} />
    </div>
  );
}
