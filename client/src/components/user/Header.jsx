import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Darkmode } from '../shared/Darkmode';

export const Header = ({}) => {

  const [location, setLocation] = useState('');
  const locations = ['Location A', 'Location B', 'Location C'];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg  w-full ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 ">
       
        <div className="text-2xl font-bold">
          <Link to={'/'} className="text-white">CinePass</Link>
        </div>

   
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

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to={'/Movies'} className="text-white hover:text-gray-300">Movies</Link>
          <Link to={'/Events'} className="text-white hover:text-gray-300">Events</Link>
          <Link to={'/Plays'} className="text-white hover:text-gray-300">Plays</Link>
          <Link to={'/About'} className="text-white hover:text-gray-300">About</Link>
        </nav>
       <Darkmode/>

         
        <div className="hidden md:flex items-center space-x-4">
        <Link to={'/login'}  className=" bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md">Log in</Link>
        <Link to={'/signup'}  className=" bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md">Sign Up</Link>
        
        </div>

      
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

   
     {isMobileMenuOpen && (
        <div className="md:hidden bg-red-700">
          <nav className="flex flex-col items-center py-4 space-y-2">
            <a href="/" className="text-white hover:text-gray-300">Movies</a>
            <a href="/events" className="text-white hover:text-gray-300">Events</a>
            <a href="/plays" className="text-white hover:text-gray-300">Plays</a>
            <a href="/sports" className="text-white hover:text-gray-300">Sports</a>
            <a href="/signin" className="bg-white text-red-600 hover:bg-gray-200 px-4 py-2 rounded-md">Sign In</a>
            <a href="/signup" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-md font-semibold">Sign Up</a>
          </nav>
        </div>
       
      )}
    </header>
  );
};


