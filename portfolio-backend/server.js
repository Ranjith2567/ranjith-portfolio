const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://ranjith-portfolio-murex.vercel.app', 'https://ranjith-portfolio-gjx8.onrender.com'],
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database pipeline successfully linked.'))
  .catch((err) => console.error('Database connection error:', err));

// Schema-la 'approved' nu oru field add panniten
const cvRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  approved: { type: Boolean, default: false }, // Ithu thaan main logic
  createdAt: { type: Date, default: Date.now }
});
const CvRequest = mongoose.model('CvRequest', cvRequestSchema);

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 2525,         // SMTP port
  secure: false,      // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  }
});
// REST API POST ENDPOINT (AUTOMATIC DOUBLE EMAIL SYSTEM)
app.post('/api/request-cv', async (req, res) => {
  try {
    const { type, name, company, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required.' });
    }

    // 1. Data-va MongoDB la save pandrom
    await new CvRequest({ type, name, company, email, approved: true }).save();

    // 2. Email 1: USER-KKU RESUME ANUPPURA EMAIL (Like Image 2)
    const userMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email, // User oda email
      subject: 'Ranjith A - Requested Curriculum Vitae (CV)',
      text: `Hello ${name},\n\nThank you for visiting my portfolio and requesting my resume.\n\nI have attached my latest printable Resume (PDF) to this email for your convenience.\n\nPlease feel free to reach out directly if you have any questions or would like to schedule a call.\n\nBest regards,\nRanjith A\nFull-Stack Developer`,
      attachments: [
        {
          filename: 'Ranjith_CV.pdf',
          path: path.join(__dirname, 'Ranjith_CV.pdf')
        }
      ]
    };
    await transporter.sendMail(userMailOptions);

    // 3. Email 2: UNGALUKKU NOTIFICATION EMAIL (Like Image 1)
    const adminMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // Unga email
      subject: '📄 CV Requested by Visitor on Portfolio',
      text: `Hello Ranjith,\n\nA visitor has requested your CV from your portfolio site:\n\nName: ${name}\nEmail Address: ${email}\nCompany: ${company || 'Visitor'}\nTimestamp: ${new Date().toLocaleString()}\n\nThe requested resume PDF has been emailed to: ${email}\n\nRegards,\nPortfolio Automation System`
    };
    await transporter.sendMail(adminMailOptions);

    // 4. Frontend-kku success signal
    res.status(200).json({ success: true, message: 'CV successfully delivered to email!' });
  } catch (error) {
    console.error('CV Delivery Error:', error);
    res.status(500).json({ error: 'System failed to send CV. Please try again.' });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server processing on port ${PORT}`));