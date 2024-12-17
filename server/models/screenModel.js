/*
import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  screenType: {
    type: String, 
    required: true,
  },
  seats: [
    {
      seatNumber: { type: String, required: true },
      isAvailable: { type: Boolean, default: true },
    }
  ],

  movieSchedules: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", 
        required: true,
      },
      showTime: {
        type:[String],
        required:true
      },
      showDate:{
        type:Date,
        default :Date.now,
        required:true,
      },
    },
  ],
});
 

export const Screen = mongoose.model("Screen", screenSchema);

*/

import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  screenType: {
    type: String,
    required: true,
  },
  seats: [
    {
      seatNumber: { type: String, required: true },
      isAvailable: { type: Boolean, default: true },
    },
  ],
  movieSchedules: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", // Reference the Movie model
        required: true,
      },
      showTime: {
        type: [String],
        required: true,
      },
      showDate: {
        type: [Date],
        required: true,
      },
    },
  ],
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre", // Reference the Theatre model
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Screen = mongoose.model("Screen", screenSchema);
