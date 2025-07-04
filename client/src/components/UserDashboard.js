import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutWrapper from '../components/LayoutWrapper';
import '../styles/UserDashboard.css';

function UserDashboard() {
  const [issues, setIssues] = useState([]);
  // const [msg, setMsg] = useState('');
  const [msg] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/issues/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch issues');
      }
    };
    fetchIssues();
  }, []);

  return (
    <LayoutWrapper>
      <div className="user-dashboard">
        <div className="user-dashboard-box">
        <h2 className="text-2xl font-semibold mb-4">Your Reported Issues</h2>
        {msg && <p className="text-red-600">{msg}</p>}
        {issues.length === 0 ? (
          <p>No issues reported yet.</p>
        ) : (
          <ul className="space-y-4">
            {issues.map((issue, idx) => (
              <li key={idx} className="issue-item">
                {/* // <li key={idx}> */}
                <p><strong>{issue.type}</strong>: {issue.description}</p>
                <p><strong>Status:</strong> {issue.status}</p>
                <p><strong>Address:</strong> {issue.address || 'No address provided'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </LayoutWrapper>
  );
}

export default UserDashboard;
