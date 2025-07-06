const mongoose = require('mongoose');

const EmergencyInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required : true,
    unique: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    default: '',
  },
  medications: {
    type: String,
    default: '',
  },
  medicalConditions: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: '', // You can store a URL or base64 string
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('EmergencyInfo', EmergencyInfoSchema);
