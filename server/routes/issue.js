const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Issue = require('../models/issue');
const auth = require('../middleware/auth');

// ✅ Removed invalid top-level line: const address = req.body.address;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ POST issue (authenticated)
// router.post('/', auth, upload.single('image'), async (req, res) => {
//   try {
//     const { type, description, latitude, longitude, address } = req.body;
//     const image = req.file?.filename;

//     const issue = new Issue({
//       type,
//       description,
//       image,
//       user: req.user.id,
//       location: {
//         type: 'Point',
//         coordinates: [parseFloat(longitude), parseFloat(latitude)]
//       },
//       address
//     });

//     console.log('Received address:', address); // ✅ Correctly placed inside the route
//     await issue.save();

//     res.status(201).json({ message: 'Issue saved' });
//   } catch (err) {
//     console.error('Issue POST error:', err);
//     res.status(500).json({ message: 'Server error while saving issue' });
//   }
// });

const singleUpload = upload.single('image');

router.post('/', auth, (req, res) => {
  singleUpload(req, res, async function (err) {
    if (err) {
      console.error('🛑 Multer Error:', err); // This logs image upload errors
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }

    try {
      const { type, description, latitude, longitude, address } = req.body;
      const image = req.file?.filename;

      console.log('✅ Received image:', req.file); // <--- This logs image file details

      const issue = new Issue({
        type,
        description,
        image,
        user: req.user.id,
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        address,
      });

      await issue.save();

      res.status(201).json({ message: 'Issue saved' });
    } catch (err) {
      console.error('🛑 Save Error:', err);
      res.status(500).json({ message: 'Server error while saving issue' });
    }
  });
});

//ye add kri iske baad ka krna hai

// ✅ GET issues reported by the logged-in user
router.get('/my', auth, async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user.id });
    res.json(issues);
  } catch (err) {
    console.error('Error fetching user issues:', err);
    res.status(500).json({ message: 'Server error while fetching issues' });
  }
});

// ✅ GET all issues (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const issues = await Issue.find().populate('user', 'email');
    res.json(issues);
  } catch (err) {
    console.error('Error fetching all issues:', err);
    res.status(500).json({ message: 'Server error while fetching all issues' });
  }
});

// ✅ Update issue status (admin only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    issue.status = req.body.status || issue.status;
    await issue.save();

    res.json({ message: 'Status updated', issue });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ message: 'Server error updating status' });
  }
});

module.exports = router;
