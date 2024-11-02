import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosInstance  } from "../../config/AxiosInstance.jsx";

const theatersData = {
  Kochi: [
    { name: "PVR Cinemas", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"] },
    { name: "Cinepolis", showtimes: ["9:00 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"] }
  ],
  Thiruvananthapuram: [
    { name: "INOX", showtimes: ["11:00 AM", "2:15 PM", "5:15 PM", "8:15 PM"] },
    { name: "Carnival Cinemas", showtimes: ["10:30 AM", "1:45 PM", "4:45 PM", "7:45 PM"] }
  ],
  Alappuzha: [
    { name: "PAN Cinemas", showtimes: ["10:15 AM", "1:15 PM", "4:15 PM", "7:15 PM"] },
    { name: "AEC Cinemas", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM"] },
    { name: "Raiban Cinehouse", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM"] },
    { name: "Kairali", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM"] }
  ],
  Thrissur: [
    { name: "D Cinemas", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"] },
    { name: "Kairali Theatre", showtimes: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"] }
  ]
}

// Sample cities and theaters data

export const Screens= () => {
  const [selectedCity, setSelectedCity] = useState("Kochi");
  const [theaters, setTheaters] = useState(theatersData[selectedCity]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cities = ["Kochi", "Thiruvananthapuram","Alappuzha", "Thrissur"];
  const navigate = useNavigate()
   const {id} =useParams();

console.log(id,"===id");


  
  // Handle city change and update theaters accordingly
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setTheaters(theatersData[city]);
    setDropdownOpen(false);
  };

  const movieBooking= async()=>{
    try {
      const response = await AxiosInstance({
        method:"GET",
        url:`/screens/by-movie/${id}`
      } )
      console.log(response,'===response');
      setMovie(response.data.screens)
      
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    movieBooking()
  },[id])

const goToScreenPage = (theater, time) => {
    navigate(`/Movies/movie-details/${id}/bookings/screens`, { state: { city: selectedCity, theater, time } });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Theatres in {selectedCity}
          </h1>

         
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              {selectedCity}
              <svg
                className="w-5 h-5 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => handleCityChange(city)}
                      className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        
        <div className="space-y-6">
          {theaters.map((theater, index) => (
            <div key={index} className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {theater.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {theater.showtimes.map((time, i) => (
                  <button
                    key={i}
                    onClick={() =>  goToScreenPage(theater.name, time)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
