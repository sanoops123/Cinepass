import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";

export const MovieScreens = () => {
  const { id } = useParams(); // Get movie ID from the URL
  const navigate = useNavigate();
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  console.log(id,'id===');
  
  useEffect(() => {
    // Fetch screens for the selected movie
    const fetchScreens = async () => {
      try {
        const response = await AxiosInstance.get(`/screens/by-movie/${id}`);
        setScreens(response?.data?.data); // Assuming the screens array is in data.data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScreens();
  }, [id]);

  const handleSelectScreen = (screenId) => {
    navigate(`/Movies/screen-details/${screenId}`); // Navigate to the screen details or booking page
  };

  if (loading) return <p>Loading screens...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Screens for Booking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {screens.map((screen) => (
          <div
            key={screen._id}
            onClick={() => handleSelectScreen(screen._id)}
            className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{screen.name}</h3>
            <p><strong>Location:</strong> {screen.location}, {screen.city}</p>
            <p><strong>Type:</strong> {screen.screenType}</p>
            <div className="mt-3">
              <h4 className="font-semibold">Showtimes:</h4>
              <ul>
                {screen.movieSchedules
                  .filter(schedule => schedule.movieId === id)
                  .map(schedule => (
                    <li key={schedule._id}>
                      {new Date(schedule.showDate).toDateString()} at {schedule.showTime}:00
                    </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
