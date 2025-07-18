import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LayoutWrapper from '../components/LayoutWrapper';
import { getUserFromToken } from '../utils/auth';
import '../styles/AdminDashboard.css';
import '../App.css';

function AdminDashboard() {
  const user = getUserFromToken();
  const [issues, setIssues] = useState([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAllIssues = async () => {
      const token = localStorage.getItem('token');
      try {
        // const res = await axios.get('http://localhost:5000/api/issues', {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/issues`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(res.data);
      } catch (err) {
        console.error('Error fetching issues:', err);
        alert('Failed to fetch issues');
      }
    };
    fetchAllIssues();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        // `http://localhost:5000/api/issues/${id}`,
        `${process.env.REACT_APP_BACKEND_URL}/api/issues/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status } : issue
        )
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const sortedIssues = [...issues].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
  });

  const openIssues = sortedIssues.filter(
    (issue) => issue.status !== 'Resolved'
  );
  const resolvedIssues = sortedIssues.filter(
    (issue) => issue.status === 'Resolved'
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const renderIssueCard = (issue) => (
    <div key={issue._id} className="issue-card">
      <p><strong>Type:</strong> {issue.type}</p>
      <p><strong>Description:</strong> {issue.description}</p>
      <p><strong>Status:</strong> {issue.status}</p>

      <select
        value={issue.status}
        onChange={(e) => updateStatus(issue._id, e.target.value)}
        className="bg-black border mt-2 p-1 rounded"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <p className="mt-2"><strong>Address:</strong> {issue.address || 'No address provided'}</p>
      <p><strong>Reported by:</strong> {issue.user?.email || 'Unknown user'}</p>
      <p><strong>Reported on:</strong> {formatDate(issue.createdAt)}</p>

      {issue.image && (
        <>
          <img
            // src={`http://localhost:5000/uploads/${issue.image}`}
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${issue.image}`}
            alt="Issue"
            style={{
              width: '200px',
              height: 'auto',
              marginTop: '10px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            // onClick={() => setSelectedImage(`http://localhost:5000/uploads/${issue.image}`)}
            onClick={() => setSelectedImage(`${process.env.REACT_APP_BACKEND_URL}/uploads/${issue.image}`)}

          />
        </>
      )}

      {issue.location?.coordinates?.length === 2 && (
        <MapContainer
          center={[issue.location.coordinates[1], issue.location.coordinates[0]]}
          zoom={13}
          style={{ height: 200, marginTop: '1rem' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[issue.location.coordinates[1], issue.location.coordinates[0]]}>
            <Popup>{issue.address || 'Location'}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );

  return (
    <LayoutWrapper user={user}>
      <div className="admin-dashboard">
        <div className="admin-dashboard-box">
          <h2 className="text-2xl font-bold mb-4">All Reported Issues</h2>

          {/* 🔽 Sort Dropdown */}
          <div className="mb-4">
            <label htmlFor="sort" className="mr-2 font-semibold">Sort by:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-black p-1 rounded"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {/* 🚧 Open Issues */}
          <h3 className="text-xl font-semibold mb-3">Pending & In Progress</h3>
          {openIssues.length > 0 ? (
            openIssues.map(renderIssueCard)
          ) : (
            <p>No open issues.</p>
          )}

          {/* ✅ Resolved Issues */}
          <h3 className="text-xl font-semibold mt-6 mb-3">Resolved Issues</h3>
          {resolvedIssues.length > 0 ? (
            resolvedIssues.map(renderIssueCard)
          ) : (
            <p>No resolved issues yet.</p>
          )}
        </div>
      </div>

      {/* 🖼️ Image Zoom Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <img
            src={selectedImage}
            alt="Full View"
            style={{
              maxHeight: '90%',
              maxWidth: '90%',
              borderRadius: '8px',
              boxShadow: '0 0 10px #000'
            }}
          />
        </div>
      )}
    </LayoutWrapper>
  );
}

export default AdminDashboard;
