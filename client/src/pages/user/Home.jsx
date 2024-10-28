import React from 'react';

export const Home = () => {
  
  const movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi", duration: "2h 28m" },
    { id: 2, title: "The Dark Knight", genre: "Action", duration: "2h 32m" },
    { id: 3, title: "Interstellar", genre: "Adventure, Drama", duration: "2h 49m" },
    { id: 4, title: "Joker", genre: "Drama, Thriller", duration: "2h 2m" },
    { id: 5, title: "Parasite", genre: "Thriller", duration: "2h 12m" },
    { id: 6, title: "Avengers: Endgame", genre: "Action, Adventure", duration: "3h 1m" },
    { id: 7, title: "Tenet", genre: "Sci-Fi, Action", duration: "2h 30m" },
    { id: 8, title: "The Matrix", genre: "Sci-Fi, Action", duration: "2h 16m" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      
      <section className="relative w-full h-80 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-5">
          <h1 className="text-4xl font-bold mb-4">Welcome to Cinepass</h1>
          <p className="text-lg">Book tickets for your favorite movies, shows, and events!</p>
          <button className="mt-5 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
            Explore Now
          </button>
        </div>
      </section>

      
      <section className="p-8">
        <h2 className="text-3xl font-semibold mb-6">Top Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          {['Now Showing', 'Coming Soon', 'Popular'].map((category, index) => (
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
              <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.genre} • {movie.duration}</p>
              <button className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

