const express = require('express');
// const multer = require('multer');
// const cloudinary = require('../utils/Cloudinary');
const Profile = require('../models/Profile');
const mongoose = require("mongoose");

const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new profile
router.post('/', async (req, res) => {
  try {
    const { name, photo, description, email, phone, location } = req.body;

    if (!photo) {
      return res.status(400).json({ message: 'Photo URL is required' });
    }

    const newProfile = new Profile({
      name,
      photo,
      description,
      email,
      phone,
      location: {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      },
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update profile
router.put('/:id', async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid profile ID' });
  }

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete profile
router.delete('/:id', async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
