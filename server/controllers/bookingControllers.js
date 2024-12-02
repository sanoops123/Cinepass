import { Booking } from "../models/bookingModel.js";
import { Movie } from "../models/moviesModel.js";

export const movieBooking = async (req, res) => {
  try {
    const { movieId, showDate, theater, showTime, title, city, seats, totalPrice } = req.body;
    const userId = req.user?.id;

    console.log("Booking Request: ", { movieId, userId, showDate, theater, showTime, title, city, seats, totalPrice });

    if (!movieId || !userId || !showDate || !title || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Missing required booking details" });
    }

    const booking = new Booking({
      movieId,
      userId,
      showDate,
      theatre: theater, // Use the correct schema field name
      showTime,
      city,
      seats,
      totalPrice,
      title,
    });

    await booking.save();
    console.log("Booking saved:", booking);
    res.status(201).json({ message: "Booking successful", data: booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Failed to book movie", error });
  }
};
/*
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


*/
export const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    const showTime = new Date(`${booking.showDate}T${booking.showTime}`);
    const currentTime = new Date();
    const timeDifference = (showTime - currentTime) / (1000 * 60 * 60); // Difference in hours

    if (timeDifference < 2) {
      return res.status(400).json({
        message: "Bookings cannot be canceled within 2 hours of the showtime.",
      });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ message: "Booking cancelled successfully." });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Failed to cancel booking. Please try again." });
  }
};
