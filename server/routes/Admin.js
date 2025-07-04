const express = require('express');
const Incident = require('../models/Incidents');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Middleware to allow only admins
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
}

// Get all incidents (for admin)
router.get('/incidents', authMiddleware, adminOnly, async (req, res) => {
  try {
    const incidents = await Incident.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    console.error('Admin fetch incidents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update incident status (In Progress, Resolved)
router.patch('/incidents/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Reported', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    incident.status = status;
    await incident.save();
    res.json({ message: 'Incident status updated', incident });
  } catch (error) {
    console.error('Admin update status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
