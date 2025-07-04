// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from './LanguageSwitcher';

// function Navbar() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   return (
//     <nav>
//       <Link to="/">{t('login')}</Link> | 
//       <Link to="/register">{t('register')}</Link> | 
//       <Link to="/report">{t('issue_type')}</Link> | 
//       <Link to="/user-dashboard">User Dashboard</Link> | 
//       <Link to="/admin-dashboard">Admin Dashboard</Link> | 
//       <button onClick={handleLogout}>{t('logout')}</button>
//       <LanguageSwitcher />
//     </nav>
//   );
// }

// export default Navbar;
