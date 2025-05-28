const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  description: String,
  email: { type: String, required: true },
  phone: String,
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

module.exports = mongoose.model('Profile', profileSchema);
