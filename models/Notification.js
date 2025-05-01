import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  message: { 
    type: String, 
    required: true,
    trim: true
  },
  date: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  college: { 
    type: String, 
    required: true,
    enum: ['engineering', 'management', 'polytechnic', 'mpgin'],
    index: true // Add index for better query performance
  },
  category: { 
    type: String,
    required: true,
    enum: ['Notice Board', 'News & Events', 'Important Notice']
  },
  linkText: { 
    type: String, 
    trim: true,
    maxlength: 50
  },
  linkUrl: { 
    type: String, 
    trim: true,
    validate: {
      validator: function(v) {
        return !v || v.startsWith('http://') || v.startsWith('https://');
      },
      message: 'Link URL must start with http:// or https://'
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for frequently queried fields
notificationSchema.index({ college: 1, date: -1 });

export default mongoose.model('Notification', notificationSchema);