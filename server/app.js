
require('dotenv').config();
// require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issue');

const app = express();

// app.use(cors());
app.use(cors({
  origin: '*', // for public access
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //ye

// app.use('/uploads', express.static('uploads')); //ye

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/issueapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));
console.log("MONGO_URI is:", process.env.MONGO_URI); // helpful for debugging

// const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// mongoose.connect('mongodb://mongo:27017/COMMUNITY-INCIDENT-APP')
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/auth', require('./routes/auth'));
// const PORT = process.env.PORT || 5000; //i changed this 
const PORT = process.env.PORT || 8080;// ❗️Don't fallback to 5000 on Cloud Run

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// const authMiddleware = require('../middleware/auth'); // JWT verify middleware

// router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
//   // your logic here
// });
