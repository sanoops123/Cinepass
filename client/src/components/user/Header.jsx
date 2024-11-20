
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Darkmode } from '../shared/Darkmode';
import { AxiosInstance } from '../../config/AxiosInstance';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    if (searchTerm.trim() !== '') {
      setIsLoading(true);
      try {
        const response = await AxiosInstance.get(`/movie/search?q=${searchTerm}`);
        setSearchResults(response.data.searchMovies);
        console.log("Fetched results:", response.data.searchMovies);
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
    console.log(id);
    
    if (id) {
      console.log("Navigating to movie with ID:", id);
      setSearchResults([]);
      setSearchTerm('');
      navigate(`/movies/movie-details/${id}`);
    } else {
      console.error("No movie ID provided for navigation");
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-blue-600 text-white shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white"><h1 className="font-bold"> CineTickets..</h1></Link>
        </div>

        
        <div className="hidden md:flex items-center bg-white rounded-md overflow-hidden relative">
          <input
            type="text"
            placeholder="Search for Movies, Events, Plays..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 w-80 text-gray-800 outline-none"
          />
          <button
            onClick={handleSearchButtonClick}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 text-white"
          >
            Search
          </button>
          
          {/* Search Results Dropdown */}
          {searchTerm && (
            <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded">
              {isLoading ? (
                <p className="p-2 text-gray-700">Loading...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((movie) => (
                  <button
                    key={movie._id}
                    onClick={() => handleMovieClick(movie._id)}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {movie.title}
                  </button>
                ))
              ) : (
                <p className="p-2 text-gray-700">No movies found.</p>
              )}
            </div>
          )}

        </div>

        {/* Other Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/Movies" className="text-white hover:text-gray-300">Movies</Link>
          <Link to="/Events" className="text-white hover:text-gray-300">Events</Link>
          <Link to="/Plays" className="text-white hover:text-gray-300">Plays</Link>
          <Link to="/About" className="text-white hover:text-gray-300">About</Link>
        </nav>
        
        {/* Dark Mode Toggle */}
        <Darkmode />
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md">Log in</Link>
          <Link to="/signup" className="bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md">Sign Up</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-red-700">
          <nav className="flex flex-col items-center py-4 space-y-2">
            <Link to="/" className="text-white hover:text-gray-300">Movies</Link>
            <Link to="/events" className="text-white hover:text-gray-300">Events</Link>
            <Link to="/plays" className="text-white hover:text-gray-300">Plays</Link>
            <Link to="/sports" className="text-white hover:text-gray-300">Sports</Link>
            <Link to="/login" className="bg-white text-red-600 hover:bg-gray-200 px-4 py-2 rounded-md">Log in</Link>
            <Link to="/signup" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-md font-semibold">Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  );
};
