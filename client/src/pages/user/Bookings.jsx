
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get("/user/mybookings");
        console.log("Bookings Data:", response.data.userBookings);
        setBookings(response.data.userBookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Unable to load your bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  return (
  
    <div className="min-h-screen bg-gray-100 p-6">
       <div className="text-2xl font-bold">
          <Link to="/" className="text-blue-600 "><h1 className="font-bold">CineTickets..</h1></Link>
        </div>
      <h1 className="text-2xl font-bold mb-4 text-center">My Bookings</h1>
      {bookings.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={booking.movieId?.posterUrl || "/default-poster.jpg"}
                alt={booking.movieId?.title || "Movie Poster"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {booking.movieId?.title || "Movie Title"}
                </h3>
                <p className="text-sm text-gray-600">
                  Theater: {booking.theatre || "N/A"}
                </p>
                <p className="text-sm text-gray-600">City: {booking.city}</p>
                <p className="text-sm text-gray-600">Date: {booking.showDate}</p>
                <p className="text-sm text-gray-600">
                  Time: {booking.showTime || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Seats: {booking.seats?.join(", ") || "N/A"}
                </p>
                <p className="text-sm text-gray-800 font-bold">
                  Total: ₹{booking.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          You have no bookings yet. Book your favorite movies now!
        </p>
      )}
    </div>
  );
};
