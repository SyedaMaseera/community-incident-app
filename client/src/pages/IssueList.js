import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    }
  });
  return null;
}

const ReportIssue = () => {
  const [form, setForm] = useState({ type: '', description: '' });
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!location || !form.type || !form.description) {
      setMsg('Please complete all fields and select a location.');
      return;
    }

    const formData = new FormData();
    formData.append('type', form.type);
    formData.append('description', form.description);
    formData.append('lat', location.lat);
    formData.append('lng', location.lng);
    if (image) formData.append('image', image);

    try {
      // await axios.post('http://localhost:5000/api/issues/report', formData, {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/issues/report`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMsg('Issue reported successfully!');
    } catch (err) {
      setMsg('Failed to report issue');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="type" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Issue Type</option>
          <option value="pothole">Pothole</option>
          <option value="streetlight">Streetlight</option>
          <option value="garbage">Garbage</option>
          <option value="water">Water Problem</option>
          <option value="animal">Stray Animals</option>
          <option value="others">Others</option>
        </select>
        <textarea name="description" placeholder="Describe the issue" onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <div className="h-64 border rounded overflow-hidden">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {location && <Marker position={location} />}
            <LocationPicker setLocation={setLocation} />
          </MapContainer>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">Submit Issue</button>
      </form>
      {msg && <p className="mt-3 text-center text-green-600">{msg}</p>}
    </div>
  );
};

export default ReportIssue;
