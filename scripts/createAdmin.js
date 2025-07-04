const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../server/models/User');

async function createAdmin() {
  try {
    mongoose.set('debug', true);

    await mongoose.connect('mongodb://127.0.0.1:27017/community-incident-app', {
      bufferCommands: false,
    });
    await new Promise(resolve => mongoose.connection.once('open', resolve));  
    console.log('Mongo connection is open, ready for operations');

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('adminpassword', 10);

    const admin = new User({
      name: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);

  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
