/*

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Theatres = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, theatres } = location.state;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  // Generate date options for the next 7 days
  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  const todayDate = getTodayDate();
  const dateOptions = generateDateOptions();

  // Set default selectedDate to today's date
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(todayDate);
    }
  }, [selectedDate, todayDate]);

  const handleShowtimeClick = (schedule, time) => {
    setSelectedShowtime({
      id: schedule._id,
      time,
      date: selectedDate,
    });
  };

  const handleBookNow = (schedule, theatre, screen) => {
    if (!selectedShowtime || selectedShowtime.id !== schedule._id) {
      alert("Please choose a showtime before booking.");
      return;
    }

    const { movieId } = schedule;
    if (!movieId || !movieId._id) {
      console.error("Invalid movieId:", movieId);
      alert("Movie details are missing for this schedule.");
      return;
    }

    const moviePoster = movieId.posterUrl;
    const movieTitle = movieId.title;
    const theatreName = theatre?.name || "Unknown Theatre";
    const poster = moviePoster || "default-poster-url";

    navigate(`/movies/movie-details/${movieId._id}/Screens/Seats`, {
      state: {
        poster,
        movieId: movieId._id,
        title: movieTitle,
        theatre: `${theatreName} (${screen.name})`, // Include screen name in brackets
        screen: screen.name,
        time: selectedShowtime.time,
        showDate: selectedShowtime.date,
        city,
      },
    });
  };

  const viewTickets = (movieId) => {
    navigate(`/movies/movie-details/${movieId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Theatres in {city}
      </h2>

      <div className="mb-6">
        <label htmlFor="dateDropdown" className="block font-semibold text-gray-700">
          Select Date:
        </label>
        <select
          id="dateDropdown"
          className="mt-2 border border-gray-300 rounded p-2 w-full"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {theatres.length > 0 ? (
        theatres.map((theatre) => (
          <div
            key={theatre._id}
            className="border border-gray-300 shadow-lg rounded-lg p-6 mb-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {theatre.name}
            </h3>
            <p className="text-gray-500">{theatre.location}</p>

            <div className="mt-4">
              <h4 className="text-xl font-semibold text-blue-600">
                Running Shows:
              </h4>
              {theatre.screens.map((screen) => (
                <div key={screen._id} className="mt-4">
                  <h5 className="font-medium text-lg text-gray-700">
                    {screen.name}
                  </h5>
                  {screen.movieSchedules.map((schedule) => (
                    <div
                      key={schedule._id}
                      className="bg-gray-100 rounded-lg p-4 mt-4 hover:shadow-md transition-shadow duration-300"
                    >
                      <p className="text-gray-800 font-medium">
                        Movie:{" "}
                        <span
                          className="text-blue-600 cursor-pointer hover:underline"
                          onClick={() => viewTickets(schedule.movieId._id)}
                        >
                          {schedule.movieId.title}
                        </span>
                      </p>
                      <div className="text-gray-600 mt-4 space-y-2">
                        <p>
                          Show Date:{" "}
                          <span className="font-medium">{selectedDate}</span>
                        </p>
                        <p className="flex gap-4">
                          Showtime:
                          {Array.isArray(schedule.showTime) ? (
                            schedule.showTime.map((time) => (
                              <button
                                key={time}
                                className={`px-3 py-1 rounded ${
                                  selectedShowtime?.id === schedule._id &&
                                  selectedShowtime.time === time
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 text-gray-700"
                                }`}
                                onClick={() => handleShowtimeClick(schedule, time)}
                              >
                                {time}
                              </button>
                            ))
                          ) : (
                            <span>{schedule.showTime || "No showtime available"}</span>
                          )}
                        </p>
                      </div>
                      <button
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => handleBookNow(schedule, theatre, screen)}
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No theatres available for {city}.
        </p>
      )}
    </div>
  );
};


*/
/*
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Theatres = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, theatres } = location.state;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  // Generate date options for the next 7 days
  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  const todayDate = getTodayDate();
  const dateOptions = generateDateOptions();

  // Set default selectedDate to today's date
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(todayDate);
    }
  }, [selectedDate, todayDate]);

  const handleShowtimeClick = (schedule, time) => {
    setSelectedShowtime({
      id: schedule._id,
      time,
      date: selectedDate,
    });
  };

  const handleBookNow = (schedule, theatre, screen) => {
    if (!selectedShowtime || selectedShowtime.id !== schedule._id) {
      alert("Please choose a showtime before booking.");
      return;
    }

    const { movieId } = schedule;
    if (!movieId || !movieId._id) {
      console.error("Invalid movieId:", movieId);
      alert("Movie details are missing for this schedule.");
      return;
    }

    const moviePoster = movieId.posterUrl;
    const movieTitle = movieId.title;
    const theatreName = theatre?.name || "Unknown Theatre";
    const poster = moviePoster || "default-poster-url";

    navigate(`/movies/movie-details/${movieId._id}/Screens/Seats`, {
      state: {
        poster,
        movieId: movieId._id,
        title: movieTitle,
        theatre: `${theatreName} (${screen ? screen.name : "Main Theatre"})`, // Include screen name or "Main Theatre"
        screen: screen ? screen.name : "Main Screen",
        time: selectedShowtime.time,
        showDate: selectedShowtime.date,
        city,
      },
    });
  };

  const viewTickets = (movieId) => {
    navigate(`/movies/movie-details/${movieId}`);
  };

  // Filter movie schedules based on selected date
  const getSchedulesForSelectedDate = (theatre) => {
    return theatre.screens.length === 0
      ? theatre.movieSchedules.filter((schedule) =>
          Array.isArray(schedule.showDate)
            ? schedule.showDate.some((date) => formatDate(date) === selectedDate)
            : formatDate(schedule.showDate) === selectedDate
        )
      : theatre.screens.flatMap((screen) =>
          screen.movieSchedules.filter((schedule) =>
            Array.isArray(schedule.showDate)
              ? schedule.showDate.some((date) => formatDate(date) === selectedDate)
              : formatDate(schedule.showDate) === selectedDate
          )
        );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Theatres in {city}
      </h2>

      <div className="mb-6">
        <label htmlFor="dateDropdown" className="block font-semibold text-gray-700">
          Select Date:
        </label>
        <select
          id="dateDropdown"
          className="mt-2 border border-gray-300 rounded p-2 w-full"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {theatres.length > 0 ? (
        theatres.map((theatre) => {
          const schedulesForSelectedDate = getSchedulesForSelectedDate(theatre);

          return (
            <div
              key={theatre._id}
              className="border border-gray-300 shadow-lg rounded-lg p-6 mb-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {theatre.name}
              </h3>
              <p className="text-gray-500">{theatre.location}</p>

              {schedulesForSelectedDate.length === 0 ? (
                <p className="text-gray-600 mt-4">No movies scheduled for this date.</p>
              ) : (
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-blue-600">
                    Running Shows:
                  </h4>

                 
                  {theatre.screens.length === 0 ? (
                    schedulesForSelectedDate.map((schedule) => (
                      <div
                        key={schedule._id}
                        className="bg-gray-100 rounded-lg p-4 mt-4 hover:shadow-md transition-shadow duration-300"
                      >
                        <p className="text-gray-800 font-medium">
                          Movie:{" "}
                          <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => viewTickets(schedule.movieId._id)}
                          >
                            {schedule.movieId.title}
                          </span>
                        </p>
                        <div className="text-gray-600 mt-4 space-y-2">
                          <p>
                            Show Date:{" "}
                            <span className="font-medium">{selectedDate}</span>
                          </p>
                          <p className="flex gap-4">
                            Showtime:
                            {Array.isArray(schedule.showTime) ? (
                              schedule.showTime.map((time) => (
                                <button
                                  key={time}
                                  className={`px-3 py-1 rounded ${
                                    selectedShowtime?.id === schedule._id &&
                                    selectedShowtime.time === time
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-300 text-gray-700"
                                  }`}
                                  onClick={() => handleShowtimeClick(schedule, time)}
                                >
                                  {time}
                                </button>
                              ))
                            ) : (
                              <span>{schedule.showTime || "No showtime available"}</span>
                            )}
                          </p>
                        </div>
                        <button
                          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          onClick={() => handleBookNow(schedule, theatre)}
                        >
                          Book Now
                        </button>
                      </div>
                    ))
                  ) : (
                    theatre.screens.map((screen) => (
                      <div key={screen._id}>
                        <h5 className="text-lg font-semibold text-gray-700">
                          Screen: {screen.name}
                        </h5>
                        {screen.movieSchedules
                          .filter((schedule) =>
                            Array.isArray(schedule.showDate)
                              ? schedule.showDate.some(
                                  (date) => formatDate(date) === selectedDate
                                )
                              : formatDate(schedule.showDate) === selectedDate
                          )
                          .map((schedule) => (
                            <div
                              key={schedule._id}
                              className="bg-gray-100 rounded-lg p-4 mt-4 hover:shadow-md transition-shadow duration-300"
                            >
                              <p className="text-gray-800 font-medium">
                                Movie:{" "}
                                <span
                                  className="text-blue-600 cursor-pointer hover:underline"
                                  onClick={() => viewTickets(schedule.movieId._id)}
                                >
                                  {schedule.movieId.title}
                                </span>
                              </p>
                              <div className="text-gray-600 mt-4 space-y-2">
                                <p>
                                  Show Date:{" "}
                                  <span className="font-medium">{selectedDate}</span>
                                </p>
                                <p className="flex gap-4">
                                  Showtime:
                                  {Array.isArray(schedule.showTime) ? (
                                    schedule.showTime.map((time) => (
                                      <button
                                        key={time}
                                        className={`px-3 py-1 rounded ${
                                          selectedShowtime?.id === schedule._id &&
                                          selectedShowtime.time === time
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-300 text-gray-700"
                                        }`}
                                        onClick={() => handleShowtimeClick(schedule, time)}
                                      >
                                        {time}
                                      </button>
                                    ))
                                  ) : (
                                    <span>{schedule.showTime || "No showtime available"}</span>
                                  )}
                                </p>
                              </div>
                              <button
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => handleBookNow(schedule, theatre, screen)}
                              >
                                Book Now
                              </button>
                            </div>
                          ))}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No theatres found for {city}.</p>
      )}
    </div>
  );
};
*/

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Theatres = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, theatres } = location.state;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get today's date
  const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  // Generate date options for the next 7 days
  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  const todayDate = getTodayDate();
  const dateOptions = generateDateOptions();

  // Set default selectedDate to today's date
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(todayDate);
    }
  }, [selectedDate, todayDate]);

  const handleShowtimeClick = (schedule, time) => {
    setSelectedShowtime({
      id: schedule._id,
      time,
      date: selectedDate,
    });
  };

  const handleBookNow = (schedule, theatre, screen) => {
    if (!selectedShowtime || selectedShowtime.id !== schedule._id) {
      alert("Please choose a showtime before booking.");
      return;
    }

    const { movieId } = schedule;
    if (!movieId || !movieId._id) {
      console.error("Invalid movieId:", movieId);
      alert("Movie details are missing for this schedule.");
      return;
    }

    const moviePoster = movieId.posterUrl;
    const movieTitle = movieId.title;
    const theatreName = theatre?.name || "Unknown Theatre";
    const poster = moviePoster || "default-poster-url";

    navigate(`/movies/movie-details/${movieId._id}/Screens/Seats`, {
      state: {
        poster,
        movieId: movieId._id,
        title: movieTitle,
        theatre: `${theatreName} (${screen.name})`, // Include screen name in brackets
        screen: screen.name,
        time: selectedShowtime.time,
        showDate: selectedShowtime.date,
        city,
      },
    });
  };

  const viewTickets = (movieId) => {
    navigate(`/movies/movie-details/${movieId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Theatres in {city}
      </h2>

      <div className="mb-6">
        <label htmlFor="dateDropdown" className="block font-semibold text-gray-700">
          Select Date:
        </label>
        <select
          id="dateDropdown"
          className="mt-2 border border-gray-300 rounded p-2 w-full"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {theatres.length > 0 ? (
        theatres.map((theatre) => {
          const schedulesForSelectedDate = theatre.screens.length === 0
            ? theatre.movieSchedules.filter((schedule) =>
                Array.isArray(schedule.showDate)
                  ? schedule.showDate.some((date) => formatDate(date) === selectedDate)
                  : formatDate(schedule.showDate) === selectedDate
              )
            : theatre.screens.flatMap((screen) =>
                screen.movieSchedules.filter((schedule) =>
                  Array.isArray(schedule.showDate)
                    ? schedule.showDate.some((date) => formatDate(date) === selectedDate)
                    : formatDate(schedule.showDate) === selectedDate
                )
              );

          return (
            <div key={theatre._id} className="border border-gray-300 shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">{theatre.name}</h3>
              <p className="text-gray-500">{theatre.location}</p>

              {schedulesForSelectedDate.length === 0 ? (
                <p className="text-gray-600 mt-4">No movies scheduled for this date.</p>
              ) : (
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-blue-600">Running Shows:</h4>

                  {theatre.screens.length === 0 ? (
                    schedulesForSelectedDate.map((schedule) => (
                      <div key={schedule._id} className="bg-gray-100 rounded-lg p-4 mt-4 hover:shadow-md transition-shadow duration-300">
                        <p className="text-gray-800 font-medium">
                          Movie:{" "}
                          <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => viewTickets(schedule.movieId._id)}
                          >
                            {schedule.movieId.title}
                          </span>
                        </p>
                        <div className="text-gray-600 mt-4 space-y-2">
                          <p>
                            Show Date: <span className="font-medium">{selectedDate}</span>
                          </p>
                          <p className="flex gap-4">
                            Showtime:
                            {Array.isArray(schedule.showTime) ? (
                              schedule.showTime.map((time) => (
                                <button
                                  key={time}
                                  className={`px-3 py-1 rounded ${
                                    selectedShowtime?.id === schedule._id &&
                                    selectedShowtime.time === time
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-300 text-gray-700"
                                  }`}
                                  onClick={() => handleShowtimeClick(schedule, time)}
                                >
                                  {time}
                                </button>
                              ))
                            ) : (
                              <span>{schedule.showTime || "No showtime available"}</span>
                            )}
                          </p>
                        </div>
                        <button
                          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          onClick={() => handleBookNow(schedule, theatre)}
                        >
                          Book Now
                        </button>
                      </div>
                    ))
                  ) : (
                    theatre.screens.map((screen) => (
                      <div key={screen._id}>
                        <h5 className="text-lg font-semibold text-gray-700">Screen: {screen.name}</h5>
                        {screen.movieSchedules
                          .filter((schedule) =>
                            Array.isArray(schedule.showDate)
                              ? schedule.showDate.some((date) => formatDate(date) === selectedDate)
                              : formatDate(schedule.showDate) === selectedDate
                          )
                          .map((schedule) => (
                            <div key={schedule._id} className="bg-gray-100 rounded-lg p-4 mt-4 hover:shadow-md transition-shadow duration-300">
                              <p className="text-gray-800 font-medium">
                                Movie:{" "}
                                <span
                                  className="text-blue-600 cursor-pointer hover:underline"
                                  onClick={() => viewTickets(schedule.movieId._id)}
                                >
                                  {schedule.movieId.title}
                                </span>
                              </p>
                              <div className="text-gray-600 mt-4 space-y-2">
                                <p>
                                  Show Date: <span className="font-medium">{selectedDate}</span>
                                </p>
                                <p className="flex gap-4">
                                  Showtime:
                                  {Array.isArray(schedule.showTime) ? (
                                    schedule.showTime.map((time) => (
                                      <button
                                        key={time}
                                        className={`px-3 py-1 rounded ${
                                          selectedShowtime?.id === schedule._id &&
                                          selectedShowtime.time === time
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-300 text-gray-700"
                                        }`}
                                        onClick={() => handleShowtimeClick(schedule, time)}
                                      >
                                        {time}
                                      </button>
                                    ))
                                  ) : (
                                    <span>{schedule.showTime || "No showtime available"}</span>
                                  )}
                                </p>
                              </div>
                              <button
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => handleBookNow(schedule, theatre, screen)}
                              >
                                Book Now
                              </button>
                            </div>
                          ))}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600">No theatres available for the selected city.</p>
      )}
    </div>
  );
};
