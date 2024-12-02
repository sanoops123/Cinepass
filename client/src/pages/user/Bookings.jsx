/*
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";
import { toast } from "react-toastify";

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get("/user/mybookings");
        console.log("Bookings Data:", response.data.userBookings);
        setBookings(response.data.userBookings.reverse()); 
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Unable to load your bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  return (
  
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">My Bookings</h1>
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
*/
/*
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";
import { toast } from "react-toastify";

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get("/user/mybookings");
        console.log("Bookings Data:", response.data.userBookings);
        setBookings(response.data.userBookings.reverse());
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Unable to load your bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmCancel) return;

      const response = await AxiosInstance.delete(`/booking/cancel/${bookingId}`);
      if (response.status === 200) {
        toast.success("Booking cancelled successfully.");
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Unable to cancel the booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
        My Bookings
      </h1>
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
               
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Cancel Booking
                </button>
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
*/

import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";
import { toast } from "react-toastify";

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get("/user/mybookings");
        console.log("Bookings Data:", response.data.userBookings);
        setBookings(response.data.userBookings.reverse());
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Unable to load your bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (booking) => {
    const showTime = new Date(`${booking.showDate}T${booking.showTime}`);
    const currentTime = new Date();
    const timeDifference = (showTime - currentTime) / (1000 * 60 * 60); // Difference in hours

    if (timeDifference < 2) {
      toast.error("You can only cancel bookings at least 2 hours before the showtime.");
      return;
    }

    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmCancel) return;

      const response = await AxiosInstance.delete(`/booking/cancel/${booking._id}`);
      if (response.status === 200) {
        toast.success("Booking cancelled successfully.");
        setBookings((prevBookings) =>
          prevBookings.filter((b) => b._id !== booking._id)
        );
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Unable to cancel the booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
        My Bookings
      </h1>
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
                
                <button
                  onClick={() => handleCancelBooking(booking)}
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Cancel Booking
                </button>
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

/*
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";
import { toast } from "react-toastify";

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get("/user/mybookings");
        setBookings(response.data.userBookings.reverse());
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Unable to load your bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (booking) => {
    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmCancel) return;

      const response = await AxiosInstance.delete(`/booking/cancel/${booking._id}`);
      if (response.status === 200) {
        toast.success("Booking cancelled successfully.");
        setBookings((prevBookings) =>
          prevBookings.filter((b) => b._id !== booking._id)
        );
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Unable to cancel the booking. Please try again.");
    }
  };

  const isCancellable = (booking) => {
    const showTime = new Date(booking.showDate);  // Booking's showDate is already an ISO string
    const currentTime = new Date();
  
    console.log("Show Time:", showTime);
    console.log("Current Time:", currentTime);
  
    const timeDifference = (showTime - currentTime) / (1000 * 60 * 60); // Difference in hours
  
    console.log("Time Difference (in hours):", timeDifference);
    return timeDifference >= 2; // Return true if it's more than 2 hours before the showtime
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
        My Bookings
      </h1>
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
          
                {isCancellable(booking) && (
                  <button
                    onClick={() => handleCancelBooking(booking)}
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Cancel Booking
                  </button>
                )}
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
*/