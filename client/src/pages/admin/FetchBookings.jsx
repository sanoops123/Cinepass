

import React from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

export const FetchBookings = () => {
    const location = useLocation();
    let bookings = location.state?.bookings || []; // Access bookings data passed via state

    // Reverse the bookings to show the latest booking first
    bookings.reverse();

    if (!bookings.length) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-700">No Bookings Found</h2>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Users Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="relative bg-white shadow-md rounded-md overflow-hidden border border-gray-300"
                        style={{
                            backgroundImage: `url(${booking.movieId?.posterUrl || ""})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "brightness(0.5)", // Dim the brightness of the background
                        }}
                    >
                        {/* Overlay for better text visibility */}
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                        {/* Booking details */}
                        <div className="relative z-10 p-4 text-white">
                            <h2 className="text-xl font-bold mb-2 text-yellow-300">{booking.title}</h2>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">Show Date:</span>{" "}
                                {moment(booking.showDate).format("DD-MM-YYYY")}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">Show Time:</span> {booking.showTime || "N/A"}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">Theatre:</span> {booking.theatre || "N/A"}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">City:</span> {booking.city || "N/A"}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">Seats:</span> {booking.seats.join(", ")}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">Total Price:</span> ₹{booking.totalPrice}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">Payment Type:</span>{" "}
                                {booking.paymentType || "Card"} {/* Default to "Card" */}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold text-gray-300">User:</span>{" "}
                                {booking.userId?.name || "N/A"} ({booking.userId?.email || "N/A"})
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
