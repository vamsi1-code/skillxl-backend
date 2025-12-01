const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // Distinguish between 'contact' form and 'service' requests
  formType: { 
    type: String, 
    required: true,
    enum: ['contact', 'service-request'] 
  },
  
  // Specific service category (e.g., 'workshop', 'crt', 'organization')
  requestCategory: { type: String }, 
  
  // Common Contact Fields
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  
  // Professional Details
  role: String,
  organization: String,
  
  // Specific Service Selections (e.g., 'AI/ML Workshop' or 'Full Stack Training')
  serviceInterest: String,
  
  // Message content
  message: String,
  
  // Metadata
  status: { 
    type: String, 
    default: 'new', 
    enum: ['new', 'contacted', 'converted', 'closed'] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);