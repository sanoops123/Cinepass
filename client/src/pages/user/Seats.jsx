
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seatsPerRow = 20; 
const seatPrice = 150;

export const Seats = () => {
  const location = useLocation()
  const navigate = useNavigate();
  
  const { movieId, title, theater, city, time ,showDate,poster} = location.state || {};

  console.log(movieId,"movieiddd");
  console.log("Title:", title);
  console.log("Theater:", theater);
  console.log("Time:", time);
  console.log("city",city);
  console.log("date",showDate);
  console.log("poster",poster);
  
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  

  const toggleSeatSelection = (seatLabel) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatLabel)
        ? prevSelectedSeats.filter((seat) => seat !== seatLabel)
        : [...prevSelectedSeats, seatLabel]
    );
  };

  const renderSeat = (row, seatNumber) => {
    const seatLabel = `${row}${seatNumber}`;
    const isSelected = selectedSeats.includes(seatLabel);
    return (
      <button
        key={seatLabel}
        className={`w-14 h-10 m-1 rounded-md ${
          isSelected ? "bg-green-600" : "bg-gray-300"
        }`}
        onClick={() => toggleSeatSelection(seatLabel)}
      >
        {seatNumber}
      </button>
    );
  };

  const renderSeatRows = () =>
    rowLabels.map((row) => (
      <div key={row} className="flex items-center mb-2">
        <span className="w-8 text-center font-bold">{row}</span>
        {[...Array(seatsPerRow)].map((_, i) => (
          <React.Fragment key={i}>
            {renderSeat(row, i + 1)}
            {(i + 1) % 7 === 0 && i + 1 !== seatsPerRow && (
              <div className="w-4" /> 
            )}
          </React.Fragment>
        ))}
      </div>
    ));

  const totalPrice = selectedSeats.length * seatPrice;

  const handleProceedToPayment = () => {
    navigate(`/movies/movie-details/${movieId}/Screens/Seats/Payment`, {
      state: { movieId,title,showDate, city,theater,poster, time, seats: selectedSeats }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Select Your Seats</h1>

      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-gray-300 text-center text-gray-700 w-2/3 py-2 font-semibold rounded">
            Welcome
          </div>
        </div>

        <div className="border-b-2 border-gray-300 mb-6" />
        <div className="overflow-x-auto">{renderSeatRows()}</div>

        <div className="mt-6">
          <p className="text-lg">Selected Seats: {selectedSeats.join(", ") || "None"}</p>
          <p className="text-lg font-bold mt-2">Total: ₹{totalPrice}</p>
          <button
            onClick={handleProceedToPayment}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};
