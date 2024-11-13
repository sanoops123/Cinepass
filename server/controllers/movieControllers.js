import { Movie } from "../models/moviesModel.js";
import { handleImageUpload } from "../utils/cloudinary.js";

export const getMovies = async (req, res, next) => {
  try {
    const movieList = await Movie.find();
    res.status(200).json({ message: "Movie fetched",data:movieList });
 } catch (error) {
   res.status(500).json({ message: 'Error fetching movies', error });
 }
};


export const addMovie = async (req, res, next) => {
    try {
        const { title, description, trailerUrl, genre, releaseDate, language,duration } = req.body;
        let imageUrl;

        if (!title || !description || !genre || !releaseDate || !duration) {
            return res.status(400).json({ message: "all fields are required.." });
        }

        
        const existingMovie = await Movie.findOne({ title, releaseDate });
        if (existingMovie) {
            return res.status(409).json({ message: "Movie already exists" });
        }

        
        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        }

        
        const newMovie = new Movie({
            title,
            description,
            genre,
            releaseDate,
            duration,
            language,
            posterUrl: imageUrl || req.body.posterUrl, 
        });

        await newMovie.save();
        res.status(201).json({ message: "Movie added successfully", data: newMovie });
    } catch (error) {
        console.error("Error adding movie:", error);
        res.status(500).json({ message: "Error adding movie", error: error.message });
    }
};


export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const movie =await Movie.findOne({_id:id})

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Got the movie you are looking for",
      data:movie,
    });
  } catch (error) {
    console.error("Error fetching movie by ID:", error); 
    res.status(500).json({ message: "Error fetching movie", error: error.message });
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res
      .status(200)
      .json({ message: "Movie updated successfully", data:updatedMovie });
  } catch (error) {
    res.status(400).json({ message: "Error updating movie", error });
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};

export const getNowShowingMovies = async (req, res, next) => {
  try {
    const nowShowingMovies = await Movie.find({ isNowShowing: true });
    res.status(200).json(nowShowingMovies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching now-showing movies", error });
  }
};

export const getUpcomingMovies = async (req, res, next) => {
  try {
    const upcomingMovies = await Movie.find({ isUpcoming: true });
    res.status(200).json(upcomingMovies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching upcoming movies", error });
  }
};

export const searchMovies = async (req, res, next) => {
  try {
    const { q } = req.query; // Extract the search term from query parameters

    const searchMovies = await Movie.find({
      title: { $regex: q, $options: 'i' } // Use 'q' as the search term for the title
    });

    res.status(200).json({ message: "Got the movie you searched for", searchMovies });
    console.log(searchMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for movies', error });
  }
};
