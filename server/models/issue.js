

// const mongoose = require('mongoose');

// const issueSchema = new mongoose.Schema({
//   type: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { type: String, default: 'Pending' },
//   location: {
//     type: { type: String, enum: ['Point'], default: 'Point' },
//     coordinates: { type: [Number], required: true },
//   },
// }, { timestamps: true });

// issueSchema.index({ location: '2dsphere' });

// module.exports = mongoose.model('Issue', issueSchema);

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved'], 
    default: 'Pending' 
  },
  address: { type: String },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },  // [lng, lat]
  },
  // <-- NEW field to store human-readable address
}, { timestamps: true });

issueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Issue', issueSchema);
