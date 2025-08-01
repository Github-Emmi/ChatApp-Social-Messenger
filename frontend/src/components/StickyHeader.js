import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiSettings, FiLogOut, FiMessageSquare, FiBell } from 'react-icons/fi';

export default function StickyHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: <FiHome />, label: 'Feed' },
    { to: '/profile', icon: <FiUser />, label: 'Profile' },
    { to: '/chat', icon: <FiMessageSquare />, label: 'Message' },
    { to: '/notifications', icon: <FiBell />, label: 'Notifications' },
    { to: '/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm flex justify-around items-center h-14">
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center px-3 text-gray-600 hover:text-blue-500 transition ${
              isActive ? 'text-blue-600 font-semibold' : ''
            }`
          }
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}

      <button
        onClick={handleLogout}
        className="flex flex-col items-center px-3 text-gray-600 hover:text-red-500 transition"
      >
        <FiLogOut />
        <span className="text-xs">Logout</span>
      </button>
    </div>
  );
}
