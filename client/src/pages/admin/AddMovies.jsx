import React, { useState } from 'react';
import { AxiosInstance } from '../../config/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AddMovies = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    releaseDate: '',
    posterUrl: null,
    trailerUrl: '',
    language:''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, posterUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const movieData = new FormData();
    movieData.append('title', formData.title);
    movieData.append('description', formData.description);
    movieData.append('genre', formData.genre);
    movieData.append('duration', formData.duration);
    movieData.append('releaseDate', formData.releaseDate);
    movieData.append('language', formData.language);
    movieData.append('trailerUrl', formData.trailerUrl);
    if (formData.posterUrl) {
      movieData.append('posterUrl', formData.posterUrl);
    }

    try {
     const response= await AxiosInstance.post('/movie/add-movies', movieData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });
      console.log(response?.data);
      
      toast.success("Movie Added Successfully..")
      navigate('/admin/moviespage'); 
    } catch (error) {
      toast.error('Adding Error')
      setError(error.response?.data?.message || 'Error adding movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg "
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Movie</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
          </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Trailer URL</label>
          <input
            type="url"
            name="trailerUrl"
            value={formData.trailerUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Poster Image</label>
          <input
            type="file"
            name="posterUrl"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? 'Adding Movie...' : 'Add Movie'}
        </button>
      </form>
    </div>
  );
};

