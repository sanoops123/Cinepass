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
      seatNumber: { type: Array, required: true },
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
        type:Array,
        required:true
      },
      showDate:{
        type:Array,
        required:true,
      },
    },
  ],
});

export const Screen = mongoose.model("Screen", screenSchema);
