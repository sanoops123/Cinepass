import { Booking } from "../models/bookingModel.js";
import { Movie } from "../models/moviesModel.js";

export const movieBooking = async (req, res, next) => {
  try {
   

    const { title, showDate, movieId, seats,userId, showTime, totalPrice, paymentType } = req.body;

    console.log("useridd===",userId);
    
    // Check if any required field is missing
    if (!title || !showDate || !showTime || !movieId || !seats || !totalPrice || !userId || !paymentType) {
      return res.status(400).json({ message: "Booking not completed. Missing required fields." });
    }

    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Create a new booking entry
    const newBooking = new Booking({
      movieId,
      title,
      userId,  // Add the userId to associate the booking with a user
      seats,
      showTime,
      showDate,
      totalPrice,
      paymentType,
      bookingDate: new Date(),
    });

    // Save the new booking to the database
    await newBooking.save();

    res.status(201).json({ message: "Booking successfully created", newBooking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

  export const cancelBooking = async (req, res,next) => {
    try {
       
       const booking = await Booking.findByIdAndDelete(req.params.id);
       if (!booking) {
         return res.status(404).json({ message: 'Booking not found' });
       }
       res.status(200).json({ message: 'Booking cancelled successfully' });

    } catch (error) {
      res.status(500).json({ message: 'Error cancelling booking', error });
    }
  };

 
  
