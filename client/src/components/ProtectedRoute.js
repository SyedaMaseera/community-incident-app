
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, adminOnly = false, children }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/user-dashboard" />;
  }

  return children;
}
