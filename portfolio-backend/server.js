const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // <-- Puthusa add panniyachu
const path = require('path'); // <-- Puthusa add panniyachu
require('dotenv').config();

const app = express();

// MIDDLEWARE SETTINGS
app.use(cors({
  // Local host and unga Vercel/Render live URLs add panniyachu
  origin: ['http://localhost:5173', 'https://ranjith-portfolio-murex.vercel.app', 'https://ranjith-portfolio-gjx8.onrender.com'], 
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

// <-- NEW: CV REQUEST SCHEMA (Yarulam download panranga nu DB la save panna) -->
const cvRequestSchema = new mongoose.Schema({
  type: { type: String },
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const CvRequest = mongoose.model('CvRequest', cvRequestSchema);

// <-- NEW: BREVO NODEMAILER SETUP -->
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  }
});

// REST API POST ENDPOINT (Pazhaya Contact Form)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, role, email, message } = req.body;
    
    if (!name || !role || !email || !message) {
      return res.status(400).json({ error: 'All tracking payload parameters required.' });
    }

    const newContactPacket = new Contact({ name, role, email, message });
    await newContactPacket.save();

    res.status(201).json({ success: true, message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: 'Message failure.' });
  }
});

// <-- NEW: REST API POST ENDPOINT (CV DOWNLOAD FORM) -->
app.post('/api/request-cv', async (req, res) => {
  try {
    const { type, name, company, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required parameters.' });
    }

    // 1. Data-va MongoDB la save pandrom
    const newRequest = new CvRequest({ type, name, company, email });
    await newRequest.save();

    // 2. Email Template
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Unga verified Brevo email id
      to: email, // User submit panna email id
      subject: `Ranjith A - Full-Stack Developer Curriculum Vitae`,
      text: `Hi ${name},\n\nThank you for exploring my digital terminal. As requested, please find attached my official Curriculum Vitae detailing my MERN stack and AI/ML engineering experience.\n\nLooking forward to potential collaborations!\n\nBest Regards,\nRanjith A\nCoimbatore, India`,
      attachments: [
        {
          filename: 'Ranjith_CV.pdf',
          path: path.join(__dirname, 'Ranjith_CV.pdf') // Backend folder-la irukura file exact-ah anuppum
        }
      ]
    };

    // 3. Brevo vazhiya email anuppu
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'CV successfully delivered to email!' });
  } catch (error) {
    console.error('CV Delivery Error:', error);
    res.status(500).json({ error: 'System failed to send CV. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server node processing on port ${PORT}`));