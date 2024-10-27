import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const Screens = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const navigate = useNavigate(); // For navigation after booking
  const [showTime, setShowTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [location, setLocation] = useState(''); // State for location

  // Sample show times, seats, and locations
  const showTimes = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM'];
  const availableSeats = Array.from({ length: 30 }, (_, i) => `Seat ${i + 1}`);
  const locations = ['Location A', 'Location B', 'Location C']; // Sample locations

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBookingConfirmation = () => {
    // Logic for booking confirmation (e.g., API call)
    console.log(`Booking confirmed for Movie ID: ${id}, Location: ${location}, Show Time: ${showTime}, Seats: ${selectedSeats.join(', ')}`);
    
    // Navigate to a confirmation page or back to movie details
    navigate(`/Movies/movie-details/${id}`); // Adjust the navigation as needed
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Book Tickets</h1>

      {/* Location Selection */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Select Location</h2>
        <select 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="border rounded-md p-2 w-full"
        >
          <option value="">Select a location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Show Time Selection */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Select Show Time</h2>
        <div className="grid grid-cols-2 gap-4">
          {showTimes.map((time) => (
            <button
              key={time}
              className={`py-2 px-4 rounded-md ${
                showTime === time ? 'bg-red-600 text-white' : 'bg-white border border-gray-300'
              }`}
              onClick={() => setShowTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Seat Selection */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Select Seats</h2>
        <div className="grid grid-cols-5 gap-2">
          {availableSeats.map((seat) => (
            <button
              key={seat}
              className={`py-2 px-4 rounded-md ${
                selectedSeats.includes(seat) ? 'bg-green-600 text-white' : 'bg-white border border-gray-300'
              }`}
              onClick={() => handleSeatSelection(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleBookingConfirmation}
        className="bg-blue-600 text-white hover:bg-blue-800 px-6 py-2 rounded-md"
        disabled={!location || !showTime || selectedSeats.length === 0} // Disable button if no location, time, or seats selected
      >
        Confirm Booking
      </button>
    </div>
  );
};


