import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; 
import '../App.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful! Now login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
   <div className="register-page">
  <div className="form-container">
    <h2>Register</h2>
    <form onSubmit={handleRegister}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
</div>

  );
}

export default Register;
