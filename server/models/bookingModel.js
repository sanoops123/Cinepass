import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  showDate: {
    type: String,
    required: true,
  },
  showTime: {
    type: String,
    //required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theatre: {
    type: String,
    //required: true,
  },
  city: {
    type: String,
    required: true,
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
   // required: true,
  },
  seats: [
    {
    type:String,
    required:true
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
   // required: true,
  },
  paymentType: {
    type: String,
    //required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
