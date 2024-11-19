
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance';
import toast from "react-hot-toast";

export const MovieEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await AxiosInstance.get(`/movie/movie-byid/${id}`);
        console.log(response?.data);
        setMovie(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`/movie/movie-delete/${id}`);
      toast.success("Movie deleted successfully");
      navigate("/admin/moviespage");
    } catch (error) {
      toast.error("Error deleting movie: " + error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedMovie = {
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      releaseDate: movie.releaseDate,
      duration: movie.duration,
      posterUrl: movie.posterUrl,
      language: movie.language
    };

    try {
      await AxiosInstance.put(`/movie/movie-update/${id}`, updatedMovie);
      toast.success("Movie updated successfully");
      navigate("/admin/moviespage");
    } catch (error) {
      toast.error("Error updating movie: " + error.message);
    }
  };

  // Navigate to the 'Create Screen' page for the selected movie
  const handleCreateScreen = () => {
    navigate(`/admin/moviespage/create-screen/${id}`);
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Movie: {movie.title}</h2>
      <form onSubmit={handleEdit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={movie.description}
            onChange={(e) => setMovie({ ...movie, description: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Genre</label>
          <input
            type="text"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={movie.genre}
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Release Date</label>
          <input
            type="date"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={new Date(movie.releaseDate).toISOString().split("T")[0]}
            onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Duration (mins)</label>
          <input
            type="number"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={movie.duration}
            onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Poster URL</label>
          <input
            type="text"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={movie.posterUrl}
            onChange={(e) => setMovie({ ...movie, posterUrl: e.target.value })}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Language</label>
          <input
            type="text"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={movie.language}
            onChange={(e) => setMovie({ ...movie, language: e.target.value })}
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Movie
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            Delete Movie
          </button>
        </div>
      </form>

      {/* Create Screen Button */}
      <button
        onClick={handleCreateScreen}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
      >
        Create Screen for this Movie
      </button>
    </div>
  );
};
