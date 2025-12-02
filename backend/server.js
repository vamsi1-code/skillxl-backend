const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Submission = require('./models/Submission');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// NOTICE: The password 'Skillxl@123' contains special characters (@).
// We must URL Encode it to 'Skillxl%40123' so the connection string parses correctly.
const DEFAULT_MONGO_URI = 'mongodb+srv://skillxl_user:Skillxl%40123@cluster0.68s12ic.mongodb.net/skillxl?appName=Cluster0';
const MONGO_URI = process.env.MONGO_URI || DEFAULT_MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for Base64 attachments

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Fail faster if blocked
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✅ MongoDB Connected Successfully to Cloud'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('SkillXL API is running');
});

// Health Check for Deployments
app.get('/health', (req, res) => {
  console.log('Health check pinged');
  res.status(200).send('OK');
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

// POST: Send Reply Email via Brevo HTTP API
app.post('/api/reply', async (req, res) => {
  try {
    const { id, to, subject, message, originalRequest, attachments } = req.body;
    
    // 1. GET CREDENTIALS FROM ENV
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.EMAIL_USER;

    if (!apiKey || !senderEmail) {
      console.warn("⚠️ Brevo credentials missing in .env.");
      return res.status(500).json({ error: 'Server Config Missing: BREVO_API_KEY or EMAIL_USER' });
    }

    // 2. BUILD HTML CONTENT
    let htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 10px; margin-bottom: 20px;">
          <h2 style="color: #06b6d4; margin: 0;">SkillXL</h2>
          <span style="font-size: 12px; color: #666;">The Bridge to Opportunity</span>
        </div>
        
        <div style="font-size: 15px; color: #1f2937;">
          ${message.trim().replace(/\n/g, '<br>')}
        </div>

        <br>
        <p style="font-size: 13px; color: #666;">Best Regards,<br><strong>SkillXL Support Team</strong><br><a href="mailto:${senderEmail}" style="color:#06b6d4">${senderEmail}</a></p>
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

    // 3. CONSTRUCT BREVO PAYLOAD
    const emailPayload = {
      sender: {
        name: 'SkillXL Support',
        email: senderEmail
      },
      to: [
        {
          email: to
        }
      ],
      subject: subject,
      htmlContent: htmlContent
    };

    // Add attachments if present
    if (attachments && Array.isArray(attachments) && attachments.length > 0) {
      // Brevo expects array of { content: 'base64', name: 'filename' }
      emailPayload.attachment = attachments.map(file => ({
        content: file.content,
        name: file.name
      }));
    }

    // 4. SEND REQUEST TO BREVO API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(emailPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API Error:', data);
      throw new Error(data.message || 'Failed to send email via Brevo');
    }

    // 5. UPDATE STATUS
    if (id) {
        await Submission.findByIdAndUpdate(id, { status: 'contacted' });
    }

    console.log(`📧 Email sent to ${to} via Brevo API`);
    res.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Email API Error:', error);
    res.status(500).json({ error: 'Failed to send email. ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SkillXL Server running on http://localhost:${PORT}`);
  console.log(`📂 Serving from: backend/server.js (CommonJS Mode)`);
});