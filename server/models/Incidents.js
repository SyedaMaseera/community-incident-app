const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueType: { type: String, required: true }, // e.g. Pothole, Water Problem, Garbage
  description: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  status: { type: String, default: 'Reported' }, // Reported, In Progress, Resolved
  imageUrl: { type: String }, // path to uploaded image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', incidentSchema);
