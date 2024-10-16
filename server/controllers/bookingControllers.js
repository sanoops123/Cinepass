import { Booking } from "../models/bookingModel.js";
import { Movie } from "../models/moviesModel.js";

export const movieBooking = async (req, res ,next) => {
    try {
        const { title,  showDate, movieId, userId, seats , showTime ,totalPrice, paymentType} = req.body;
  
   if( !title, !showDate , !showTime , !movieId, !userId, !seats, !totalPrice, !paymentType){
    return res.status(400).json({message:"booking not completed"})
   }

      // Find the movie to ensure it exists
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // Create a new booking object
      const newBooking = new Booking({
       movieId,
        title,
        userId,
        seats,
        showTime,
        showDate, 
        totalPrice,
        paymentType,
        bookingDate: new Date(),
      });
  
      await newBooking.save();
      res.status(201).json({ message: 'Booking created successfully', newBooking });
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking', error });
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

 
  
