
import {Seat} from '../models/SeatModel.js'

export const getSeats = async (req, res) => {
    try {
      const { screenId, showTime } = req.params;
      console.log(screenId,showTime,"screen and showtime");
      
  
      // Fetch seats for the given screen and show time
      const seats = await Seat.find({ screenId, showTime });

      console.log(seats,"===seats");
      
  
      if (!seats.length) {
        return res.status(404).json({ message: "No seats available for this show" });
      }
  
      res.status(200).json({ message: "Seats retrieved", data: seats });
    } catch (error) {
      res.status(500).json({ message: "Error fetching seats", error });
    }
  };
  

  export const updateSeatAvailability = async (movieId, showDate, selectedSeats) => {
    try {
      // Update the seat status to 'booked' in the database
      await Seat.updateMany(
        { movieId, showDate, seatLabel: { $in: selectedSeats } },
        { $set: { status: 'booked' } }
      );
    } catch (error) {
      console.error("Error updating seat availability:", error.message);
    }
  };
  