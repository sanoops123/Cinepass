import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    if (searchTerm.trim() !== '') {
      setIsLoading(true);
      try {
        const response = await AxiosInstance.get(`/movie/search?q=${searchTerm}`);
        setSearchResults(response.data.searchMovies || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
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
      setSearchTerm('');
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

          {/* Dropdown for Search Results */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-md rounded-md z-50">
              {searchResults.map((movie) => (
                <button
                  key={movie._id}
                  onClick={() => handleMovieClick(movie._id)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {movie.title}
                </button>
              ))}
            </div>
          )}

   
          {searchTerm && !isLoading && searchResults.length === 0 && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-md rounded-md z-50">
              <p className="p-2 text-gray-700">No movies found.</p>
            </div>
          )}

        
          {isLoading && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-md rounded-md z-50">
              <p className="p-2 text-gray-700">Loading...</p>
            </div>
          )}
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/Movies" className="text-white hover:text-gray-300">Movies</Link>
          <Link to="/Events" className="text-white hover:text-gray-300">Events</Link>
          <Link to="/About" className="text-white hover:text-gray-300">About</Link>
        </nav>

        {/* Authentication Links */}
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
            <Link to="/Movies" className="text-white hover:text-gray-300">Movies</Link>
            <Link to="/Events" className="text-white hover:text-gray-300">Events</Link>
            <Link to="/login" className="bg-white text-red-600 hover:bg-gray-200 px-4 py-2 rounded-md">Log in</Link>
            <Link to="/signup" className="bg-white text-red-600 hover:bg-gray-200 px-4 py-2 rounded-md">Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  );
};
