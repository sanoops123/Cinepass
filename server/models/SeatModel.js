import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
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
export const Seat = mongoose.model("Seat", seatSchema);
