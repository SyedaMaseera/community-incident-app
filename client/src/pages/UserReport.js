// src/pages/UserReport.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function UserReport() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setMsg('Title is required');
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:5000/api/issues',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg('Issue reported successfully!');
      setTitle('');
      setDescription('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to report issue');
    }
  };

  return (
    <div>
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Issue</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default UserReport;
