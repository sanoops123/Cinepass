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
        type:Number,
        required:true
      },
      showDate:{
        type:String,
        required:true,
      },
    },
  ],
});

export const Screen = mongoose.model("Screen", screenSchema);
