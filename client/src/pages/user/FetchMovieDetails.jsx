
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.jsx";

export const FetchMovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, loading, error] = useFetch(`/movie/movie-byid/${id}`);


  if (!movie) return <p>No movie found.</p>;
  console.log("movie===",movie.title);
  console.log("poster===",movie.posterUrl);

  console.log(id,"id===");
  
  
  
  const viewScreens = () => {
    navigate(`/Movies/movie-details/${id}/Screens`,{
      state: {
        title: movie.title,
        poster : movie.posterUrl
      }
    });
  };

  

  return (
    <div className="flex p-6">
      {loading && <p>Loading movie details...</p>}
      {error && <p>Error fetching movie details. Please try again later.</p>}
      
      {movie && (
        <div className="w-4/12 max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
            <p className="mt-3 text-sm text-gray-500">
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Duration:</strong> {movie.duration} mins
            </p>
          </div>
        </div>
      )}
      
      {movie && (
        <div className="w-10/12 ml-6">
          <p className="text-gray-600 text-3xl mt-2">{movie.description}</p>
          <p className="mt-2 text-blue-600">
            <strong>Trailer:</strong>{" "}
            <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
              Watch Trailer
            </a>
          </p>

          <div className="mt-4 space-x-4">
            <button
              onClick={viewScreens}
              className="bg-red-600 text-white hover:bg-red-800 px-4 py-2 rounded-md"
            >
              Book Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
