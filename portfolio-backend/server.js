const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// MIDDLEWARE SETTINGS
app.use(cors({
  origin: 'http://localhost:5173', // Directly whitelists your React application port
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// MONGODB CONNECTION SETTINGS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database pipeline successfully linked.'))
  .catch((err) => console.error('Database connection error:', err));

// SCHEMAS & MODELS
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// REST API POST ENDPOINT
app.post('/api/contact', async (req, res) => {
  try {
    const { name, role, email, message } = req.body;
    
    if (!name || !role || !email || !message) {
      return res.status(400).json({ error: 'All tracking payload parameters required.' });
    }

    const newContactPacket = new Contact({ name, role, email, message });
    await newContactPacket.save();

    // Sends positive validation packet with clean data markers back to UI state
    res.status(201).json({ success: true, message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Message failure.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server node processing on port ${PORT}`));