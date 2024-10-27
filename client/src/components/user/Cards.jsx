import React from 'react'
import { Link } from 'react-router-dom'

export const Moviecard = () => {
  return (
    
    <div >
        
       <div className="flex flex-wrap gap-8 justify-center p-5">
      
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 transform transition duration-300 hover:scale-105">
          <img
            src={movie?.posterUrl}
            alt={movie?.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800">{movie?.title}</h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{movie?.description}</p>
            <p className="mt-3 text-sm text-gray-500"><strong>Genre:</strong> {movie?.genre}</p>
            <p className="text-sm text-gray-500"><strong>Release Date:</strong> {new Date(movie?.releaseDate).toDateString()}</p>
            <p className="text-sm text-gray-500"><strong>Duration:</strong> {movie?.duration} mins</p>
            <Link to={`/movie-details/${movie?._id}`}>
            <button>tap</button></Link>
          </div>
        </div>
      
    </div>
    </div>
    
  ) 
}
