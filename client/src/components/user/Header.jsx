

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(""); // Default city set to empty string
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();

  const cities = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  const handleCityChange = async (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    if (city) {
      try {
        const response = await AxiosInstance.get(`/theatre/get-theatres`);

        const filteredTheatres = response.data.data.filter(
          (theatre) => theatre.city === city
        );

        setTheatres(filteredTheatres);

        // Navigate to a new page with the city-specific theaters
        navigate("/theatres", { state: { city, theatres: filteredTheatres } });
      } catch (error) {
        console.error("Error fetching theatres:", error.message);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    if (searchTerm.trim() !== "") {
      setIsLoading(true);
      try {
        const response = await AxiosInstance.get(
          `/movie/search?q=${searchTerm}`
        );
        setSearchResults(response.data.searchMovies || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleMovieClick = (id) => {
    if (id) {
      navigate(`/movies/movie-details/${id}`);
      setSearchResults([]);
      setSearchTerm("");
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-blue-600 text-white shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-white text-2xl font-bold">
          CineTickets
        </Link>

        <div className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search for Movies..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 w-80 text-gray-800 outline-none border rounded-l-md"
          />
          <button
            onClick={handleSearchButtonClick}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 text-white rounded-r-md"
          >
            Search
          </button>
        </div>

        <div className="ml-4">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="bg-white text-gray-700 px-4 py-2 rounded-md"
          >
            <option value="">Select City</option> {/* Add option for Select City */}
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/Movies" className="text-white hover:text-gray-300">
            Movies
          </Link>
          <Link to="/Events" className="text-white hover:text-gray-300">
            Events
          </Link>
          <Link to="/About" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link
            to="/login"
            className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};
