import React from "react";
import { useLocation } from "react-router-dom";

export const FetchBookings = () => {
    const location = useLocation();
    const bookings = location.state?.bookings || []; // Access bookings data passed via state

    if (!bookings.length) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold">No Bookings Found</h2>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Users Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white shadow-md rounded-md p-4 border border-gray-300"
                    >
                        <h2 className="text-xl font-bold mb-2">{booking.title}</h2>
                        <p className="text-gray-600">
                            <span className="font-semibold">Show Date:</span> {booking.showDate}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Show Time:</span> {booking.showTime || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Theatre:</span> {booking.theatre || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">City:</span> {booking.city}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Seats:</span> {booking.seats.join(", ")}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Total Price:</span> ₹{booking.totalPrice}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Payment Type:</span> {booking.paymentType || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">User:</span>{" "}
                            {booking.userId?.name || "N/A"} ({booking.userId?.email || "N/A"})
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
