const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    default: 'kg'
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    default: 'Local farm'
  },
  harvestDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'sold'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
