
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";


const cities = ["Kochi", "Thiruvananthapuram", "Alappuzha", "Thrissur"]; 

export const Screens = () => {
  const [selectedCity, setSelectedCity] = useState("Alappuzha"); 
  const [screens, setScreens] = useState([]);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation()
  const { title,poster } = location.state || {};

  console.log("title==",title);
  console.log("poster==",poster);


  const fetchScreens = async () => {
    try {
      const response = await AxiosInstance.get(`/screen/by-movie/${id}`);
      setScreens(response.data.data); 
    } catch (error) {
      console.error("Error fetching screens", error);
    }
  };

  useEffect(() => {
    fetchScreens();
  }, [id]); 

  console.log(id,"===idd");
  
  
  const filteredScreens = screens.filter(screen => screen.city === selectedCity);

 console.log(screens,"screen");
 
  const goToBookingPage = (screen, time, showDate,) => {
    navigate(`/Movies/movie-details/${id}/Screens/Seats`, {
      state: {
        poster,
        movieId: id, 
        title,
        theater: screen, 
        time, 
        showDate, 
        city: selectedCity
      }
    });
  };

  
  
  

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-500 mb-4">{title}</h1>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Theatres in {selectedCity} </h1>

        <div className="mb-4">
          <label htmlFor="city-select" className="block text-sm font-medium text-gray-700">
            Select City:
          </label>
          <select
            id="city-select"
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

        <div className="space-y-6">
          {filteredScreens.length > 0 ? (
            filteredScreens.map((screen, index) => (
              <div key={index} className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{screen.name}</h2>
                <div className="space-y-2">
                  {screen.movieSchedules.map((schedule, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="text-gray-700 font-medium">
                        {new Date(schedule.showDate).toLocaleDateString()}:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {schedule.showTime.map((time, j) => (
                          <div key={j} className="flex items-center">
                            <button
                              onClick={() => goToBookingPage(screen.name, time, schedule.showDate)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                            >
                              {time}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No theaters available in {selectedCity} for this movie.</p> // Message for no theaters
          )}
        </div>
      </div>
    </div>
  );
};
