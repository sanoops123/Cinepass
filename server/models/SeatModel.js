const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatNumber: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true, 
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screen',
    required: true,
  },
  showDate: {
    type: Date,
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Seat', seatSchema);
