// src/pages/AdminIssues.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function AdminIssues() {
  const [issues, setIssues] = useState([]);
  const [msg, setMsg] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // const res = await axios.get('http://localhost:5000/api/issues', {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/issues`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(res.data);
      } catch (err) {
        setMsg(err.response?.data?.message || 'Failed to fetch issues');
      }
    };

    fetchIssues();
  }, [token]);

  return (
    <div>
      <h2>All Reported Issues</h2>
      {msg && <p>{msg}</p>}
      <ul>
        {issues.map(issue => (
          <li key={issue._id}>
            <strong>{issue.title}</strong> by {issue.userId?.name || 'Unknown'} ({issue.userId?.email || 'No email'})
            <br />
            Status: {issue.status}
            <br />
            Description: {issue.description || 'No description'}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminIssues;
