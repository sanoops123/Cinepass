import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posterUrl: { 
    type: String,
    default:'',
    required:true
   },
  trailerUrl: { 
    type: String ,
    default:'',
    //required :true
  },
  rating: {
    type: Number,
   // required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  duration: {
    type:String,
    required: true,
  },
  releaseDate: {
    type:String,
    required:true,
 },
 showtimes: [{
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater' },
  date: { type: Date },
  time: { type: String },
  price: { type: Number },
  screen: { type: String },
  availableSeats: { type: Number }
}],
  cast: [
    {
      celebType: String,
      celebName: String,
      celebRole: String,
      celebImage: String,
    },
  ],
  crew: [
    {
      celebType: String,
      celebName: String,
      celebRole: String,
      celebImage: String,
    },
  ],
  isNowShowing: { type: Boolean, default: false },
  isUpcoming: { type: Boolean, default: true }
});

export const Movie = mongoose.model("Movie", movieSchema);
