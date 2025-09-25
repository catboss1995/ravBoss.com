const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    required: true,
    enum: ['illustration', 'character_design', 'logo', 'animation', 'other']
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  deadline: {
    type: Date
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'in_progress', 'completed', 'cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Commission', commissionSchema);