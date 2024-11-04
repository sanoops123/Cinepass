
import React from 'react';
import { useFetch } from '../../hooks/useFetch.jsx';
import { useNavigate } from 'react-router-dom';
import { MoviesLoading } from '../../components/shared/SkeltonMovies.jsx';

export const MoviesPage = () => {
  const [movies, loading, Error] = useFetch("/movie/get-movies");
  const navigate = useNavigate();

  const viewTickets = (id) => {
    navigate(`/Movies/movie-details/${id}`);
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center p-5">
      {loading ? (
        <MoviesLoading />
      ) : (
        (movies || []).map((movie) => (
          <div
            key={movie._id}
            onClick={() => viewTickets(movie._id)}
            className="bg-white rounded-lg shadow-lg overflow-hidden w-80 transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            <img
              src={movie.posterUrl || "/default-poster.jpg"} 
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{movie.description}</p>
              <p className="mt-3 text-sm text-gray-500"><strong>Genre:</strong> {movie.genre}</p>
              <p className="text-sm text-gray-500"><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
              <p className="text-sm text-gray-500"><strong>Duration:</strong> {movie.duration} mins</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
