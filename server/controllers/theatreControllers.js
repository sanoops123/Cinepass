import { Theatre } from "../models/theatreModel.js";
import { Screen } from "../models/screenModel.js";
import { Movie } from "../models/moviesModel.js";

export const createTheatre = async (req, res) => {
  const { name, location, city, screens } = req.body;  // Expecting screens array in request body
  
  try {
    // Create the new theatre
    const newTheatre = new Theatre({
      name,
      location,
      city,
    });
  
    const savedTheatre = await newTheatre.save();

    // If screens data is provided, create the screens and link them to the theatre
    if (screens && screens.length > 0) {
      const createdScreens = [];
      for (let screenData of screens) {
        // Add the theatreId to the screen data
        const screen = new Screen({
          ...screenData,
          theatreId: savedTheatre._id,  // Link the screen to the newly created theatre
        });

        // Save the screen
        const savedScreen = await screen.save();
        createdScreens.push(savedScreen._id);  // Store the screen ID for linking to the theatre
      }

      // Link the created screens to the theatre
      savedTheatre.screens = createdScreens;
      await savedTheatre.save();
    }

    res.status(201).json({
      message: "Theatre and screens created successfully",
      data: savedTheatre,
    });
  } catch (error) {
    console.error("Error creating theatre:", error.message);
    res.status(500).json({ message: "Error creating theatre and screens", error });
  }
};

// Get all theatres with their screens and movie schedules
export const getAllTheatres = async (req, res) => {
  try {
    // Fetch all theatres and populate their screens and movie schedules
    const theatres = await Theatre.find().populate({
      path: "screens",
      populate: {
        path: "movieSchedules.movieId", // Populate movie details in schedules
        select: "title genre releaseDate", // Select the fields you want to show
      },
    });

    if (theatres.length === 0) {
      return res.status(404).json({ message: "No theatres found" });
    }

    res.status(200).json({
      message: "Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    console.error("Error fetching theatres:", error.message);
    res.status(500).json({ message: "Error fetching theatres", error });
  }
};

// Get theatre details by ID with its screens and movie schedules
export const getTheatreById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the theatre by its ID and populate screens and movie schedules
    const theatre = await Theatre.findById(id).populate({
      path: "screens",
      populate: {
        path: "movieSchedules.movieId", // Populate movie details in schedules
        select: "title genre releaseDate", // Select the fields you want to show
      },
    });

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    res.status(200).json({
      message: "Theatre fetched successfully",
      data: theatre,
    });
  } catch (error) {
    console.error("Error fetching theatre:", error.message);
    res.status(500).json({ message: "Error fetching theatre", error });
  }
};

// Function to delete a theatre
export const deleteTheatre = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the theatre by ID
    const theatre = await Theatre.findById(id);
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Remove the theatre from the database
    await Theatre.findByIdAndDelete(id);

    // Optionally, remove all associated screens (this is a choice)
    await Screen.deleteMany({ theatreId: id });

    res.status(200).json({ message: "Theatre and its screens deleted successfully" });
  } catch (error) {
    console.error("Error deleting theatre:", error.message);
    res.status(500).json({ message: "Error deleting theatre", error });
  }
};


export const addMovieToTheatre = async (req, res) => {
  const { theatreId, screenId } = req.params; // screenId is optional, for specific screen
  const { movieId, showTimes, showDate } = req.body;

  try {
    // Step 1: Find the theatre by its ID
    const theatre = await Theatre.findById(theatreId).populate("screens");

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Step 2: Check if the movie exists in the database
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Step 3: Create the movie schedule object
    const movieSchedule = {
      movieId: {
        _id: movie._id,
        title: movie.title,
        genre: movie.genre,
        releaseDate: movie.releaseDate,
      },
      showTime: [...new Set(showTimes)], // Ensure no duplicate showtimes
      showDate: showDate,
    };

    // Step 4: If the screenId is provided, update the specific screen
    if (screenId) {
      const screen = theatre.screens.find(screen => screen._id.toString() === screenId);
      
      if (!screen) {
        return res.status(404).json({ message: "Screen not found" });
      }

      // Check if the schedule already exists for the movie and showDate
      const existingScheduleIndex = screen.movieSchedules.findIndex(
        (schedule) =>
          schedule.movieId._id.toString() === movieId &&
          new Date(schedule.showDate).toDateString() === new Date(showDate).toDateString()
      );

      if (existingScheduleIndex !== -1) {
        // Update existing showtimes if the schedule already exists
        screen.movieSchedules[existingScheduleIndex].showTime = [
          ...new Set([
            ...screen.movieSchedules[existingScheduleIndex].showTime,
            ...showTimes,
          ]),
        ];
      } else {
        // Add a new movie schedule to the screen
        screen.movieSchedules.push(movieSchedule);
      }

      await screen.save();

      // Return response for specific screen
      return res.status(200).json({
        message: "Movie added successfully to the screen",
        data: theatre, // Return full theatre data
      });
    }

    // Step 5: If no screenId is provided, add the movie schedule to the theatre itself
    const existingScheduleIndex = theatre.movieSchedules.findIndex(
      (schedule) =>
        schedule.movieId._id.toString() === movieId &&
        new Date(schedule.showDate).toDateString() === new Date(showDate).toDateString()
    );

    if (existingScheduleIndex !== -1) {
      // Update existing showtimes if the schedule already exists
      theatre.movieSchedules[existingScheduleIndex].showTime = [
        ...new Set([
          ...theatre.movieSchedules[existingScheduleIndex].showTime,
          ...showTimes,
        ]),
      ];
    } else {
      // Add a new movie schedule to the theatre
      theatre.movieSchedules.push(movieSchedule);
    }

    await theatre.save();

    // Return response for theatre
    return res.status(200).json({
      message: "Movie added successfully to theatre",
      data: theatre.movieSchedules.map(schedule => ({
        movieId: {
          _id: schedule.movieId._id,
          title: schedule.movieId.title,
          genre: schedule.movieId.genre,
          releaseDate: schedule.movieId.releaseDate,
        },
        showTime: schedule.showTime,
        showDate: schedule.showDate,
      })),
    });
  } catch (error) {
    console.error("Error adding movie to theatre/screen:", error.message);
    res.status(500).json({ message: "Error adding movie to theatre/screen", error });
  }
};


// Function to fetch theatres with movie schedules
export const CreateKottaka = async (req, res) => {
  const { name, location, city, hasMultipleScreens = true } = req.body;

  try {
    // Create a new theatre
    const newTheatre = new Theatre({
      name,
      location,
      city,
      hasMultipleScreens,
      screens: [], // No screens added during creation
    });

    // Save the theatre to the database
    await newTheatre.save();

    res.status(201).json({
      message: "Theatre created successfully",
      data: newTheatre,
    });
  } catch (error) {
    console.error("Error creating theatre:", error.message);
    res.status(500).json({ message: "Error creating theatre", error });
  }
};

export const editTheatre = async (req, res, next) => {
  try {
    const { theatreId } = req.params; // Extract theatre ID from request parameters
    const updateData = req.body; // The updated data from the request body

    console.log("Update Data:", updateData);

    // Find the theatre by ID and update it with the new data
    const updatedTheatre = await Theatre.findByIdAndUpdate(
      theatreId,
      { $set: updateData }, // Update only the fields provided
      { new: true, runValidators: true } // Return the updated document and validate the fields
    );

    if (!updatedTheatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    res.status(200).json({
      message: "Theatre updated successfully",
      data: updatedTheatre,
    });
  } catch (error) {
    console.error("Error updating theatre:", error);
    res.status(500).json({ message: "Error updating theatre", error });
  }
};
