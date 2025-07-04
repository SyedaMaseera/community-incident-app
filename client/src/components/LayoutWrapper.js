import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Layout.css';
import { getUserFromToken } from '../utils/auth';
import { FaGlobe } from 'react-icons/fa';
import './Translate.css'; // Add this at the top of LayoutWrapper

// import { useEffect } from 'react';

export default function LayoutWrapper({ children, user: propUser }) {
  const user = propUser || getUserFromToken();
  const [menuOpen, setMenuOpen] = useState(false);
//   useEffect(() => {
//   if (window.google && window.google.translate) {
//     new window.google.translate.TranslateElement(
//       { pageLanguage: 'en' },
//       'google_translate_element'
//     );
//   }
// }, []);

  const navigate = useNavigate();

  // const getInitial = () => {
  //   return user?.name ? user.name.charAt(0).toUpperCase() : '?';
  // };

  const getInitial = () => {
  if (user?.name) return user.name.charAt(0).toUpperCase();
  if (user?.email) return user.email.charAt(0).toUpperCase();
  return '?';
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Sidebar links based on user and role
  const sidebarLinks = [
 
    { label: 'Dashboard', to: '/' },
    { label: 'Report Issue', to: user ? '/report' : '/login' },
    user && { label: 'Your Reports', to: '/user-dashboard' },
    user?.role === 'admin' && { label: 'Admin Dashboard', to: '/admin-dashboard' },
    user ? { label: 'Logout', action: handleLogout } : { label: 'Login', to: '/login' },
    !user && { label: 'Register', to: '/register' },
  ].filter(Boolean); // remove falsey

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pr-20 bg-white shadow-md fixed top-0 w-full z-50">
  {/* Logo on left */}
  <div className="text-xl font-bold text-blue-600">
    <Link to="/">CityFix</Link>
  </div>

  {/* Nav Links in middle */}
  <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
    {user ? (
      <>
        <Link to="/">Dashboard</Link>
        <Link to="/report">Issue Type</Link>
        <Link to="/user-dashboard">User Dashboard</Link>
        {user.role === 'admin' && <Link to="/admin-dashboard">Admin Dashboard</Link>}
        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </nav>

  {/* Right: Language & Avatar */}
  <div className="flex items-center gap-4">
    {/* Avatar */}
    {user && (
      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold cursor-default">
        {getInitial()}
      </div>
    )}

    {/* Google Translate */}
    {/* <div id="google_translate_element" className="z-50" /> */}
    <div className="flex items-center gap-2 bg-grey rounded px-2 py-1 shadow-md">
  <FaGlobe className="text-blue-600" />
  <div id="google_translate_element" />
</div>
    {/* Hamburger Menu for mobile */}
    <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl md:hidden focus:outline-none">
      <FaBars />
    </button>
  </div>
     {/* Google Translate Dropdown */}
   <div id="google_translate_element" className="absolute top-4 right-4 z-50"></div>
</header>

     
      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 z-40 flex flex-col gap-4 transition duration-300">
          <button onClick={() => setMenuOpen(false)} className="self-end text-red-600 font-bold text-xl">×</button>
          {sidebarLinks.map((link, idx) =>
            link.action ? (
              <button
                key={idx}
                onClick={() => {
                  setMenuOpen(false);
                  link.action();
                }}
                className="text-left"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={idx}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                {link.label}
              </Link>
            )
          )}

          
        </div>
      )}

      {/* Body */}
      <main className="pt-20 px-4">{children}</main>
    </div>
  );
}
