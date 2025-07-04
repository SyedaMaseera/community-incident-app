import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './pages/Home';

import Register from './components/Register';
import ReportIssue from './pages/ReportIssue';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import 'leaflet/dist/leaflet.css';
import { getUserFromToken } from './utils/auth';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  
  const user = getUserFromToken();
  return (
    
    <Router>
    
      <Routes>
         <Route path="/" element={<Home />} />
  {/* <Route path="/report" element={<ReportIssue />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Home />} />

        
<Route
          path="/report"
          element={
            <ProtectedRoute user={user}>
              <ReportIssue user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute user={user}>
              <UserDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={user} adminOnly={true}>
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
