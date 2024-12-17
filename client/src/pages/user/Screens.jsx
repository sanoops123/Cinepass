

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";

const cities = ["Kochi", "Thiruvananthapuram", "Alappuzha", "Thrissur"];

export const Screens = () => {
  const [selectedCity, setSelectedCity] = useState("Alappuzha");
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [screens, setScreens] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { title, poster, } = location.state || {};

  // Fetch screens by movie ID
  const fetchScreens = async () => {
    try {
      const response = await AxiosInstance.get(`/screen/by-movie/${id}`);
      console.log("Fetched screens data:", response.data);
      setScreens(response.data.data); // Set screens from backend response
    } catch (error) {
      console.error("Error fetching screens", error);
    }
  };

  useEffect(() => {
    fetchScreens();
  }, [id]);

  // Function to format a date in DD/MM/YYYY format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTodayDate = () => formatDate(new Date()); // Get today's date
  const todayDate = getTodayDate();

  // Generate a list of dates for the next 7 days
  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  const dateOptions = generateDateOptions();

  // Set default selectedDate to today's date if empty
  useEffect(() => {
    if (!selectedDate) setSelectedDate(todayDate);
  }, [selectedDate, todayDate]);

  // Filter screens based on city and selected date
  const filteredScreens = screens.filter((screen) => {
    const city = screen?.theatreDetails?.city?.trim().toLowerCase();
    if (city !== selectedCity.trim().toLowerCase()) return false;

    // Filter schedules by selected date
    screen.filteredSchedules = screen.movieSchedules.filter((schedule) => {
      const formattedDates = schedule.showDate.map((date) => formatDate(date));
      return formattedDates.includes(selectedDate);
    });

    return screen.filteredSchedules.length > 0;
  });

  // Filter out past showtimes for today
  const realTimeFilteredScreens = selectedDate === todayDate
  ? filteredScreens.filter((screen) =>
      screen.movieSchedules.some((schedule) =>
        schedule.showTime.some((time) => {
          const cleanTime = time.trim();
          const now = new Date();

          const [timePart, meridian] = cleanTime.split(" ");
          let [hours, minutes] = timePart.split(":").map(Number);

          if (meridian === "PM" && hours < 12) hours += 12;
          if (meridian === "AM" && hours === 12) hours = 0;

          // ***KEY CHANGE: Create showTime for TODAY***
          const showTime = new Date(); // Use today's date
          showTime.setHours(hours, minutes, 0, 0);

          console.log("Current Time:", now.toLocaleString()); // More informative output
          console.log("Showtime Being Compared:", showTime.toLocaleString());
          console.log("Raw Now:", now);
          console.log("Raw Showtime:", showTime);


          const isFutureShowtime = showTime > now;
          console.log("Is Future Showtime?", isFutureShowtime);

          return isFutureShowtime;
        })
      )
    )
  : filteredScreens;

  
  // Book Tickets Navigation
  const goToBookingPage = (screen, time, showDate) => {
    navigate(`/movies/movie-details/${id}/Screens/Seats`, {
      state: {
        poster,
        movieId: id,
        title,
        theatre: screen.theatreDetails.name,
        screen: screen.screenName,
        time,
        showDate,
        city: selectedCity,
      },
    });
  };

  
  

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-500 mb-4">{title}</h1>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Theatres in {selectedCity}
        </h1>

        {/* City Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select City:
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="mt-1 block w-44 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block w-44 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          >
            {dateOptions.map((date) => (
              <option key={date} value={date}>
                {date === todayDate ? "Today" : date}
              </option>
            ))}
          </select>
        </div>

        {/* Screen Listing */}
        <div className="space-y-6">
          {realTimeFilteredScreens.length > 0 ? (
            realTimeFilteredScreens.map((screen, index) => (
              <div key={index} className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {screen.theatreDetails?.name}{" "}
                  {screen.screenName ? `(${screen.screenName})` : ""}
                </h2>
                <div className="space-y-2">
                  {screen.filteredSchedules.map((schedule, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="text-gray-700 font-medium">
                        {selectedDate}:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {schedule.showTime.map((time, j) => (
                          <button
                            key={j}
                            onClick={() =>
                              goToBookingPage(screen, time, selectedDate)
                            }
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
            ))
          ) : (
            <p className="text-gray-600">
              {selectedDate === todayDate
                ? "Today has no more shows for this movie."
                : "No shows available for the selected date."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
