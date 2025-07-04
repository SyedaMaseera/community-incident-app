const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issues');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/issue-reporting');

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
