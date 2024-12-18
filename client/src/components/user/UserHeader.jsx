
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Darkmode } from "../shared/Darkmode.jsx";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";
import { ShoppingBag, SquareUser, Menu, X } from "lucide-react";
import toast from "react-hot-toast";

export const UserHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(""); // Default city set to empty string
  const [theatres, setTheatres] = useState([]);

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

  const logOut = async () => {
    try {
      const response = await AxiosInstance({
        method: "POST",
        url: "/user/log-out",
      });
      console.log("response===", response);
      toast.success("Logout Successful", { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
      console.log(error);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg w-full relative z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white">
            CineTickets..
          </Link>
        </div>

        {/* City Dropdown */}
        <div className="ml-4">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="bg-white text-gray-700 px-4 py-2 rounded-md"
          >
            <option value="">Select City</option> {/* Default option */}
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-white rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search for Movies, Events, Plays..."
            className="px-4 py-2 w-80 text-gray-800 outline-none"
          />
          <button className="bg-red-700 hover:bg-red-800 px-4 py-2 text-white">
            Search
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center absolute md:relative bg-blue-600 md:bg-transparent top-16 md:top-0 left-0 w-full md:w-auto`}
          style={{ zIndex: 50 }}
        >
          <Link to="/Movies" className="text-white hover:text-gray-300">
            Movies
          </Link>
          <Link to="/Events" className="text-white hover:text-gray-300">
            Events
          </Link>
          <Link to="/About" className="text-white hover:text-gray-300">
            About
          </Link>

          {/* User Menu */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-9 items-center">
            <Darkmode />

            <Link
              to="/user/my-bookings"
              className="flex items-center text-white hover:text-gray-300"
            >
              <h2 className="mr-1">My-Bookings</h2>
              <ShoppingBag />
            </Link>
            <Link
              to="/user/profile"
              className="flex items-center text-white hover:text-gray-300"
            >
              <h2 className="mr-1">Profile</h2>
              <SquareUser />
            </Link>
            <button
              onClick={logOut}
              className="bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md"
            >
              Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-white rounded-md overflow-hidden px-4 py-2 mt-2">
        <input
          type="text"
          placeholder="Search for Movies, Events, Plays..."
          className="px-4 py-2 w-full text-gray-800 outline-none"
        />
        <button className="bg-red-700 hover:bg-red-800 px-4 py-2 text-white w-full mt-2">
          Search
        </button>
      </div>
    </header>
  );
};

