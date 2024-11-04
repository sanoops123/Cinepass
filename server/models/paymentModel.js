import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
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
    type: Date, // Use Date type for dates
    required: true,
  },
  showTime: {
    type: String, // Use String type for specific time representations
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

export const Payment  = mongoose.model("Payment", paymentSchema);
