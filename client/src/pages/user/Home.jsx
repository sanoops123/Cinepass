import React, { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  
  const movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi,Action", duration: "2h 28m" ,posterUrl: "titles/inception.jpg"},
    { id: 2, title: "The Dark Knight", genre: "Action", duration: "2h 32m" ,posterUrl: "titles/dark knight.jpg"},
    { id: 3, title: "Interstellar", genre: "Sci-fi/Adventure", duration: "2h 49m" ,posterUrl: "titles/interstellar.jpg"},
    { id: 4, title: "The Shawshank Redemption", genre: "Comedy,Romance", duration: "2h 16m",posterUrl: "titles/TSR.jpg" },
    { id: 5, title: "churuli",genre: "Horror/Mystery", duration: "2h 12m", posterUrl: "titles/churuli.jpg" },
    { id: 6, title: "Taxi driver", genre: "Crime,Noir", duration: "1h 53m", posterUrl: "titles/taxi driver.jpg"},
    { id: 7, title: "The pursuit of happiness", genre: "Family,Drama", duration: "1h 57m",posterUrl: "titles/poh.jpg" },
    { id: 8, title: "Fight Club", genre: "Dram, Thriller", duration: "2h 19m" ,posterUrl: "titles/fight club.jpg"},
  ];



  

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      
      <section className="relative w-full h-72 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-5">
          <h1 className="text-4xl font-bold mb-4">Welcome to CineTickets..</h1>
          <p className="text-lg">Book tickets for your favorite movies..</p>
          
        </div>
      </section>

      
      <section className="p-8">
        <h2 className="text-3xl font-semibold mb-6">Top Categories</h2>
        <div className="grid grid-cols-5 gap-4">
          {['Now Showing'].map((category, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      
      <section className="p-8">
        <h2 className="text-3xl font-semibold mb-6">Now Showing</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.genre} • {movie.duration}</p>
              <Link to={"/Movies"}><button  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">
                Book Now
              </button></Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

