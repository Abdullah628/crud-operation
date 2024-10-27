const express = require('express');
const router = express.Router();
const axios = require('axios');

const baseUrl = "https://wesoftin-backend.vercel.app/users";

// Get All Users
router.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}?sort=desc`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single User by ID
router.get('/users/:id', async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New User
router.post('/users', async (req, res) => {
  try {
    const response = await axios.post(baseUrl, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update User by ID
router.put('/users/:id', async (req, res) => {
  try {
    const response = await axios.put(`${baseUrl}/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete User by ID
router.delete('/users/:id', async (req, res) => {
  try {
    await axios.delete(`${baseUrl}/${req.params.id}`);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
