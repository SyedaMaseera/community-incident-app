import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import '../App.css';
// import { useNavigate } from 'react-router-dom';
// import { getUserFromToken } from '../utils/auth';
import loginBg from '../styles/assets/login-bg.jpg';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, form);
      setMsg('Login successful! Redirecting...');
      
      // You can save user info here
      localStorage.setItem('user', JSON.stringify(res.data.user));
// Inside your login handler, after getting response from backend
localStorage.setItem('token', res.data.token);

      // Redirect user based on role
      // if (res.data.user.role === 'admin') {
      //   setTimeout(() => navigate('/admin-dashboard'), 1500);
      // } else {
      //   setTimeout(() => navigate('/user-dashboard'), 1500);
      // }
      window.location.href = res.data.user.role === 'admin'
  ? '/admin-dashboard'
  : '/user-dashboard';
//       if (res.data.user.role === 'admin') {
//   navigate('/admin-dashboard');
// } else {
//   navigate('/user-dashboard');
// }


    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
//     <div className="login-page" style={{ backgroundImage: `url(${loginBg})` }}
// >
<div
  className="min-h-screen flex items-center justify-center relative"
  style={{
    backgroundImage: `url(${loginBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Optional dark overlay */}
  
  {/* <div className="relative z-10"> */}
    {/* Your login form goes here */}
  {/* </div> */}
{/* </div> */}


      <div className="login-box">
        <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
    </div>
  );
}


export default Login;
