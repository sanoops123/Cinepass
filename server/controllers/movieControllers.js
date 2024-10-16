
import { Movie} from "../models/moviesModel.js";

export const addMovie = async (req, res,next) => {
    try {
      const {title,description,posterUrl,trailerUrl,genre,releaseDate,duration,rating,} =req.body;

      if (!title,!description,!genre,!releaseDate,!duration)
      {
        return res.status(400).json({message:"all fields are required"})
      }
      const newMovie = new Movie({ title, description, duration,genre,releaseDate, });
      await newMovie.save();
      res.status(201).json({ message: 'Movie added successfully', newMovie });
    } catch (error) {
      res.status(400).json({ message: 'Error adding movie', error });
      console.log(error);
     
         }
  };

  
export const getMovies = async (req, res,next) => {
    try {
       const movieList = await Movie.find();
       res.status(200).json({ message: "Movie fetched",movieList });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movies', error });
    }
  };


  export const getMovieById = async (req, res,next) => {
    try {
      const movieById = await Movie.findById(req.params.id);
      if (!movieById) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json({message:"got the movie you are looking for ",movieById});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movie', error });
    }
  }; 

  export const updateMovie = async (req, res,next) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json({ message: 'Movie updated successfully', updatedMovie });
    } catch (error) {
      res.status(400).json({ message: 'Error updating movie', error });
    }
  };

  export const deleteMovie = async (req, res,next ) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      if (!deletedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting movie', error });
    }
  };

  export const getNowShowingMovies = async (req, res,next) => {
    try {
      const nowShowingMovies = await Movie.find({ isNowShowing: true });
      res.status(200).json(nowShowingMovies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching now-showing movies', error });
    }
  };

  
  export const getUpcomingMovies = async (req, res,next) => {
    try {
      const upcomingMovies = await Movie.find({ isUpcoming: true });
      res.status(200).json(upcomingMovies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching upcoming movies', error });
    }
  };

  