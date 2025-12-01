const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dns = require('dns');
const Submission = require('./models/Submission');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// NOTICE: The password 'Skillxl@123' contains special characters (@).
// We must URL Encode it to 'Skillxl%40123' so the connection string parses correctly.
const DEFAULT_MONGO_URI = 'mongodb+srv://skillxl_user:Skillxl@cluster0.elco56s.mongodb.net/?appName=Cluster0';
const MONGO_URI = DEFAULT_MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully to Cloud'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('SkillXL API is running');
});

// POST: Submit a new form
app.post('/api/submit', async (req, res) => {
  try {
    const { 
      formType, 
      requestCategory, 
      name, 
      email, 
      phone, 
      role, 
      organization, 
      serviceInterest, 
      message 
    } = req.body;

    const newSubmission = new Submission({
      formType,
      requestCategory,
      name,
      email,
      phone,
      role,
      organization,
      serviceInterest,
      message
    });

    await newSubmission.save();
    
    console.log(`📩 New Submission [${formType}]: ${email}`);
    res.status(201).json({ success: true, message: 'Submission saved successfully' });
  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({ success: false, error: 'Failed to save submission' });
  }
});

// GET: Retrieve all submissions (For Admin Dashboard)
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// PUT: Update Submission Status
app.put('/api/submissions/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedSubmission = await Submission.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// POST: Send Reply Email
app.post('/api/reply', async (req, res) => {
  try {
    const { id, to, subject, message, originalRequest } = req.body;
    
    // 1. VALIDATE EMAIL DOMAIN (DNS CHECK)
    const domain = to.split('@')[1];
    if (domain) {
      try {
        await new Promise((resolve, reject) => {
          dns.resolveMx(domain, (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
              return reject(new Error('Invalid Email Domain (No MX Records found)'));
            }
            resolve(addresses);
          });
        });
      } catch (dnsError) {
        console.error(`DNS Validation Failed for ${to}:`, dnsError.message);
        return res.status(400).json({ error: `Invalid Email Domain: @${domain} does not exist or cannot receive emails.` });
      }
    }

    // 2. CHECK CREDENTIALS
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("⚠️ Email credentials missing in .env. Logging email instead.");
      console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
      
      await Submission.findByIdAndUpdate(id, { status: 'contacted' });
      return res.json({ success: true, message: 'Mock email sent (check server console)' });
    }

    // 3. BUILD HTML CONTENT
    let htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 10px; margin-bottom: 20px;">
          <h2 style="color: #06b6d4; margin: 0;">SkillXL</h2>
          <span style="font-size: 12px; color: #666;">The Bridge to Opportunity</span>
        </div>
        
        <div style="font-size: 15px; color: #1f2937; white-space: pre-wrap;">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <br>
        <p style="font-size: 13px; color: #666;">Best Regards,<br><strong>SkillXL Support Team</strong><br><a href="mailto:support@skillxl.in" style="color:#06b6d4">support@skillxl.in</a></p>
    `;

    // Append Original Request Details
    if (originalRequest) {
      htmlContent += `
        <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <h3 style="font-size: 14px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Original Request Details</h3>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; font-size: 13px; color: #4b5563;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${originalRequest.name}</p>
            ${originalRequest.role ? `<p style="margin: 5px 0;"><strong>Job Title / Role:</strong> ${originalRequest.role}</p>` : ''}
            ${originalRequest.service ? `<p style="margin: 5px 0;"><strong>Interested In:</strong> ${originalRequest.service}</p>` : ''}
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #d1d5db;">
              <strong>Message:</strong><br>
              <em style="color: #6b7280;">"${originalRequest.message || 'No message content'}"</em>
            </div>
          </div>
        </div>
      `;
    }

    htmlContent += `</div>`;

    // 4. SEND EMAIL
    await transporter.sendMail({
      from: `"SkillXL Support" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: message, // Fallback
      html: htmlContent
    });

    // 5. UPDATE STATUS
    await Submission.findByIdAndUpdate(id, { status: 'contacted' });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ error: 'Failed to send email. ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SkillXL Server running on http://localhost:${PORT}`);
  console.log(`📂 Serving from: backend/server.js (CommonJS Mode)`);
});