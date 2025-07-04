const express = require('express');
const Incident = require('../models/Incidents');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const Incidents = require('../models/Incidents');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create new incident report (user must be logged in)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { issueType, description, address, lat, lng } = req.body;

    if (!issueType || !description || !address || !lat || !lng) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const incident = new Incident({
      user: req.user.id,
      issueType,
      description,
      location: {
        address,
        coordinates: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        }
      },
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await incident.save();
    res.status(201).json({ message: 'Incident reported successfully', incident });
  } catch (error) {
    console.error('Incident creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all incidents for logged-in user (user dashboard)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const incidents = await Incident.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    console.error('Fetching user incidents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
