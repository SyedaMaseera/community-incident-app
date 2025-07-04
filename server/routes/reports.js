const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Create a new report
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { category, description, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const newReport = new Report({
      user: req.user.id,
      category,
      description,
      location,
      image
    });

    await newReport.save();
    res.status(201).json({ message: 'Report created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
