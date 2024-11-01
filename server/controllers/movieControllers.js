import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Movie } from "../models/moviesModel.js";
import { handleImageUpload } from "../utils/cloudinary.js";

export const addMovie = async (req, res, next) => {
  try {
      let imageUrl;
      
      const { title, description,posterUrl,trailerUrl,genre,releaseDate,duration} = req.body;
    
      console.log("posterUrl====", req.file);
      console.log("body ===",req.body);
      

      if (!title,!description,!genre,!releaseDate,!duration,!posterUrl)
        {
          return res.status(400).json({message:"all fields are required",})
        }

        const existingMovie = await Movie.findOne({ title, releaseDate });
      if (existingMovie) {
          return res.status(409).json({ message: "Movie already exists" }); 
      }

      if (req.file) {
          const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
          imageUrl= cloudinaryRes.url;
          
      }

      console.log(imageUrl,'====imageUrl');
      
      const newMovie = new Movie({ title, description, duration,genre,releaseDate,posterUrl:imageUrl ||posterUrl }); 
      await newMovie.save();

      res.status(201).json({ message: "Movie added successfully", data: newMovie });
  } catch (error) {
      console.log(error);
      res.status(401).json({ message :"Error adding movie", error});
  }
};
export const getMovies = async (req, res, next) => {
  try {
    const movieList = await Movie.find();
    res.status(200).json({ message: "Movie fetched",movieList });
 } catch (error) {
   res.status(500).json({ message: 'Error fetching movies', error });
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
      movie,
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
      .json({ message: "Movie updated successfully", updatedMovie });
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
