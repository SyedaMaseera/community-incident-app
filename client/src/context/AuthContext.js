import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (email, password) => {
    try {
      // const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.user.role === 'admin') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
