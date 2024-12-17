import mongoose from "mongoose";
/*
const theatreSchema = new mongoose.Schema({
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
  screens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen", // Reference the Screen model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Theatre = mongoose.model("Theatre", theatreSchema);
*/const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  screens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Screen" }], // Default: empty array
  hasMultipleScreens: { type: Boolean, default: true },
  movieSchedules: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
      showTime: [String], // Array of showtimes
      showDate: {type: [Date ]}
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Theatre = mongoose.model("Theatre", theatreSchema);

