const mongoose = require('mongoose')

const tickeBookedSchema = new mongoose.schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
    required: true,
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true,
  },
  seatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  showDate: {
    type: Number,
    required: true,
  },
  showTime: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Ticket = mongoose.model("Ticket", tickeBookedSchema);
