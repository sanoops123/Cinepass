/*import React from 'react';
import { useLocation } from 'react-router-dom';

export const Bookings = () => {
  const location = useLocation();
  const { movieId, title, theater, city, time, seats, showDate } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {title ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmation</h1>
          <p className="text-lg font-semibold text-gray-600 mb-2">{title}</p>
          <div className="mb-4">
            <p><strong>Theater:</strong> {theater}</p>
            <p><strong>City:</strong> {city}</p>
            <p><strong>Date:</strong> {showDate}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Seats:</strong> {seats.join(', ')}</p>
          </div>
          <p className="text-green-600 font-semibold">Your booking is confirmed!</p>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No booking details available.</p>
      )}
    </div>
  );
};
*/
import React, { useState, useEffect } from 'react';
import { AxiosInstance } from "../../config/AxiosInstance.jsx";

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get('/user/my-bookings'); // Adjust to your API endpoint
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {isLoading ? (
        <p>Loading bookings...</p>
      ) : bookings.length > 0 ? (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">{booking.title}</h2>
              <p><strong>Theater:</strong> {booking.theater}</p>
              <p><strong>City:</strong> {booking.city}</p>
              <p><strong>Date:</strong> {booking.showDate}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600">You have no bookings.</p>
      )}
    </div>
  );
};
