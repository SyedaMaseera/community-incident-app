const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function submitReport() {
  const form = new FormData();
  form.append('category', 'potholes');
  form.append('description', 'Large pothole near my street');
  form.append('location', 'MG Road, Bangalore');
//   form.append('image', fs.createReadStream(path.join(__dirname, 'sample-image.jpg'))); // use your image file here

  try {
    const response = await axios.post('http://localhost:5000/api/reports', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: 'Bearer YOUR_JWT_TOKEN_HERE'  // replace with valid token
      },
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

submitReport();
