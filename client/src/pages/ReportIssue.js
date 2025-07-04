import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LayoutWrapper from '../components/LayoutWrapper';
import '../styles/ReportIssue.css'
import '../App.css';

// Fix leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

const issueTypes = [
  'Potholes',
  'Water',
  'Street Lights',
  'Garbage',
  'Street Dogs',
  'Mosquitoes',
  'Power Outage',
  'Others',
];

export default function ReportIssue() {
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!location) {
      setAddress('');
      return;
    }
    const fetchAddress = async () => {
      try {
        const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            lat: location.lat,
            lon: location.lng,
            format: 'json',
          },
        });
        setAddress(res.data.display_name || 'Address not found');
      } catch {
        setAddress('Address not found');
      }
    };
    fetchAddress();
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !desc || !location) {
      setMsg('Please fill all fields and select a location');
      return;
    }

    const formData = new FormData();
    formData.append('type', type);
    formData.append('description', desc);
    formData.append('latitude', location.lat);
    formData.append('longitude', location.lng);
    formData.append('address', address);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMsg('You must be logged in to submit an issue');
        return;
      }
      // await axios.post('http://localhost:5000/api/issues', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      await axios.post('http://localhost:5000/api/issues', formData, {
  headers: {
    Authorization: `Bearer ${token}`, // ✅ Only set auth manually
    // Do NOT set Content-Type here
  },
});



      setMsg('Issue submitted successfully!');
      setType('');
      setDesc('');
      setImage(null);
      setLocation(null);
      setAddress('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to submit issue');
    }
  };

  return (
    <LayoutWrapper>
     <div className="report-issue-page full-background">
        <div className="report-form">
        <h2 className="text-2xl white font-bold mb-4">Report an Issue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Issue Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              // className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              {issueTypes.map((issue, idx) => (
                <option key={idx} value={issue}>{issue}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              required
              className="w-full p-2 border rounded"
              placeholder="Describe the issue..."
            />
          </div>

          <div>
            <label className="block font-medium">Upload Image (optional):</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div>
            <label className="block font-medium mb-1">Select Location on Map:</label>
            <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: 300 }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker onLocationSelect={setLocation} />
              {location && <Marker position={location} />}
            </MapContainer>
            <p className="mt-2 text-sm text-white-600"><strong>Selected Location:</strong> {address || 'Click on the map'}</p>
          </div>

          <button type="submit" 
          // className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>

          {msg && <p className={`mt-2 text-sm ${msg.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
        </form>
      </div>
      </div>
    </LayoutWrapper>
  );
}
