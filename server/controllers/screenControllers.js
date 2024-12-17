import { Screen } from "../models/screenModel.js";
import { Theatre } from "../models/theatreModel.js";


export const createScreen = async (req, res) => {
  const { name,screenType, seats, movieSchedules, theatreId } = req.body;

  try {
    const newScreen = new Screen({
      name,
      screenType,
      seats,
      movieSchedules,
    });

    const savedScreen = await newScreen.save();

    // Link the screen to the theatre
    if (theatreId) {
      const theatre = await Theatre.findById(theatreId);
      if (!theatre) {
        return res.status(404).json({ message: "Theatre not found" });
      }

      // Push the new screen ID into the screens array
      theatre.screens.push(savedScreen._id);
      await theatre.save();
    }

    res.status(201).json({ message: "Screen created and added to theatre", data: savedScreen });
  } catch (error) {
    console.error("Error creating screen:", error.message);
    res.status(500).json({ message: "Error creating screen", error });
  }
};

// Function to create a new screen for a particular theatre
/*export const createScreenForTheatre = async (req, res) => {
  const { theatreId } = req.params; // Extract the theatreId from the route parameters
  const { name, screenType, seats, movieSchedules } = req.body;

  try {
    // Create a new screen
    const newScreen = new Screen({
      name,
      screenType,
      seats,
      movieSchedules,
      theatreId, // Associate the screen with the theatre
    });

    // Save the new screen
    const savedScreen = await newScreen.save();

    // Find the theatre and add the new screen to its screens array
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Add the new screen's ID to the theatre's screens array
    theatre.screens.push(savedScreen._id);
    await theatre.save();

    res.status(201).json({
      message: "Screen created successfully and added to the theatre",
      data: savedScreen,
    });
  } catch (error) {
    console.error("Error creating screen:", error.message);
    res.status(500).json({ message: "Error creating screen", error });
  }
};
*/

export const addScreensToTheatre = async (req, res) => {
  const { theatreId } = req.params;
  const { screens } = req.body;

  try {
    // Find the theatre by theatreId
    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Ensure that the screens array is initialized
    if (!theatre.screens) {
      theatre.screens = [];
    }

    // Add the screens to the theatre
    const screenIds = [];
    for (const screenData of screens) {
      const screen = new Screen(screenData);
      await screen.save(); // Save each screen
      screenIds.push(screen._id);
    }

    // Add the new screen IDs to the theatre's screens array
    theatre.screens.push(...screenIds);
    await theatre.save();

    res.status(200).json({
      message: "Screens added successfully to the theatre",
      data: theatre,
    });
  } catch (error) {
    console.error("Error adding screens to theatre:", error.message);
    res.status(500).json({ message: "Error adding screens to theatre", error });
  }
};


export const getAllScreens = async (req, res, next) => {
  try {
    const screens = await Screen.find().populate(
      "movieSchedules.movieId",
      "title"
    );
    res.status(200).json({ message: "screen fetched successsfully", screens });
  } catch (error) {
    res.status(500).json({ message: "Error fetching screens", error });
  }
};

export const getScreenById = async (req, res, next) => {
  try {
    console.log("Screen ID:", req.params.id); 
    const screen = await Screen.findById(req.params.id).populate(
      "movieSchedules.movieId",
      "title"
    );
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json({ message: "got a screen", data: screen });
  } catch (error) {
    res.status(500).json({ message: "Error fetching screen details", error });
  }
};

/*export const updateScreen = async (req, res, next) => {
  try {
    const { name, location, city, screenType, seats, movieSchedules} =req.body;
    const updatedScreen = await Screen.findByIdAndUpdate(req.params.id, { name, location, city, screenType, seats, movieSchedules} ,{ new: true, runValidators: true} );
    if (!updatedScreen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res
      .status(200)
      .json({ message: "Screen updated successfully", updatedScreen });
  } catch (error) {
    res.status(500).json({ message: "Error updating screen", error });
  }
};
*/

// Delete a screen by screen ID
export const deleteScreen = async (req, res, next) => {
  try {
    const screen = await Screen.findByIdAndDelete(req.params.id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json({ message: "Screen deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting screen", error });
  }
};


export const getScreensByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Fetch theatres with populated screens and movie schedules
    const theatres = await Theatre.find({})
      .populate({
        path: 'screens',
        populate: {
          path: 'movieSchedules.movieId',
          select: 'title genre releaseDate',
        },
      });

    // Check if theatres exist
    if (!theatres || theatres.length === 0) {
      return res.status(404).json({
        message: 'No theatres found',
        data: [],
      });
    }

    // Initialize arrays to store theatre and screen data
    let theatreData = [];
    let screenData = [];

    // Iterate through each theatre
    theatres.forEach((theatre) => {
      // Check if the movie is in the theatre's movieSchedules (general theatre schedule)
      const movieInTheatre = theatre.movieSchedules.filter(
        (schedule) => schedule.movieId && schedule.movieId._id.toString() === movieId
      );

      // If movie found in the theatre's general schedule, add theatre details
      if (movieInTheatre.length > 0) {
        theatreData.push({
          theatreDetails: {
            name: theatre.name,
            city: theatre.city,
            location: theatre.location,
          },
          movieSchedules: movieInTheatre,
        });
      }

      // Check screens for movie schedules
      if (theatre.screens && theatre.screens.length > 0) {
        theatre.screens.forEach((screen) => {
          const filteredSchedules = screen.movieSchedules.filter(
            (schedule) => schedule.movieId && schedule.movieId._id.toString() === movieId
          );

          if (filteredSchedules.length > 0) {
            screenData.push({
              theatreDetails: {
                name: theatre.name,
                city: theatre.city,
                location: theatre.location,
              },
              screenId: screen._id,
              screenName: screen.name,
              screenType: screen.screenType,
              seats: screen.seats,
              movieSchedules: filteredSchedules,
            });
          }
        });
      }
    });

    // Combine both results: if movie was found in a theatre or on a screen
    const combinedResults = [...theatreData, ...screenData];

    // If no data found, return an appropriate message
    if (combinedResults.length === 0) {
      return res.status(404).json({
        message: 'No theatres or screens found for the specified movie',
        data: [],
      });
    }

    // Send the combined data
    res.status(200).json({
      message: 'Screens found',
      data: combinedResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching screens', error: error.message });
  }
};

/*
export const getScreensByMovieId = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    console.log('===movie id:', movieId);

    // Find screens that have a schedule for the specified movie ID
    const screens = await Screen.find({
      "movieSchedules.movieId": movieId
    }).populate("movieSchedules.movieId", "title");

    console.log("screens==", screens);

   

    if (!screens || screens.length === 0) {
      return res.status(404).json({ message: "No screens found for this movie" });
    }

    res.status(200).json({ message: "Screens found", data: screens, });
  } catch (error) {
    console.error("Error fetching screens:", error);
    res.status(500).json({ message: "Error fetching screens", error });
  }
};
*/

export const editScreen = async (req, res, next) => {
  try {
    const { theatreId, screenId } = req.params; // Extract theatre and screen IDs
    const updateData = req.body; // Updated screen data from request body

    console.log("Update Data:", updateData);

    // Find the theatre containing the screen
    const theatre = await Theatre.findById(theatreId).populate("screens");

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Find the screen within the theatre
    const screenIndex = theatre.screens.findIndex(
      (screen) => screen._id.toString() === screenId
    );

    if (screenIndex === -1) {
      return res.status(404).json({ message: "Screen not found in this theatre" });
    }

    // Update the screen details
    const screen = theatre.screens[screenIndex];
    for (const key in updateData) {
      screen[key] = updateData[key]; // Update fields dynamically
    }

    // Save the updated screen
    await screen.save();

    res.status(200).json({
      message: "Screen updated successfully",
      data: screen,
    });
  } catch (error) {
    console.error("Error updating screen:", error);
    res.status(500).json({ message: "Error updating screen", error });
  }
};

export const getScreenDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the screen and include theatre details
    const screen = await Screen.findById(id).populate("theatreId", "name location city");

    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    res.status(200).json({ 
      message: "Screen details fetched successfully", 
      data: screen 
    });
  } catch (error) {
    console.error("Error fetching screen:", error.message);
    res.status(500).json({ message: "Error fetching screen", error });
  }
};

// Get all screens of a particular theatre
export const getScreensByTheatreId = async (req, res) => {
  const { theatreId } = req.params;

  try {
    // Fetch the theatre by ID and populate the screens array
    const theatre = await Theatre.findById(theatreId).populate("screens");

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    res.status(200).json({
      message: "Screens fetched successfully",
      data: theatre.screens,  // Send back only the screens
    });
  } catch (error) {
    console.error("Error fetching screens:", error.message);
    res.status(500).json({ message: "Error fetching screens", error });
  }
};

// Delete a screen from a particular theatre
export const deleteScreenFromTheatre = async (req, res) => {
  const { theatreId, screenId } = req.params;

  try {
    // Remove screen reference from the theatre's 'screens' array
    const theatre = await Theatre.findByIdAndUpdate(
      theatreId,
      { $pull: { screens: screenId } },  // Remove the screen ID from the theatre
      { new: true }
    );

    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    // Delete the screen from the Screen model
    await Screen.findByIdAndDelete(screenId);

    res.status(200).json({ message: "Screen deleted successfully" });
  } catch (error) {
    console.error("Error deleting screen:", error.message);
    res.status(500).json({ message: "Error deleting screen", error });
  }
};


// Function to delete a movie from a particular screen
export const deleteMovieFromScreen = async (req, res) => {
  const { screenId, movieId } = req.params;

  try {
    // Find the screen by ID
    const screen = await Screen.findById(screenId);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    // Find the index of the movie schedule to remove
    const movieIndex = screen.movieSchedules.findIndex(
      (schedule) => schedule.movieId.toString() === movieId
    );

    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie not found on this screen" });
    }

    // Remove the movie schedule from the screen
    screen.movieSchedules.splice(movieIndex, 1);
    await screen.save();

    res.status(200).json({
      message: "Movie removed from the screen successfully",
      data: screen,
    });
  } catch (error) {
    console.error("Error deleting movie from screen:", error.message);
    res.status(500).json({ message: "Error deleting movie from screen", error });
  }
};

export const addMovieToScreen = async (req, res) => {
  const { screenId } = req.params;
  const { movieId, showTimes, showDate } = req.body;

  try {
    // Fetch the screen details
    const screen = await Screen.findById(screenId).populate("movieSchedules.movieId");

    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    // Check for overlapping showtimes in the same screen
    for (const newShowTime of showTimes) {
      const newStart = new Date(`${showDate} ${newShowTime}`);
      const newEnd = new Date(newStart.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours

      for (const schedule of screen.movieSchedules) {
        const existingStart = new Date(`${schedule.showDate} ${schedule.showTime}`);
        const existingEnd = new Date(existingStart.getTime() + 3 * 60 * 60 * 1000);

        if (
          (newStart >= existingStart && newStart < existingEnd) || // Starts during an existing show
          (newEnd > existingStart && newEnd <= existingEnd) // Ends during an existing show
        ) {
          return res.status(400).json({
            message: `Showtime overlaps with an existing schedule for ${schedule.movieId.title}`,
          });
        }
      }
    }

    // Add the new showtimes to the movieSchedules
    for (const showTime of showTimes) {
      screen.movieSchedules.push({ movieId, showTime, showDate });
    }

    await screen.save();

    res.status(200).json({
      message: "Movie added to screen successfully",
      data: screen,
    });
  } catch (error) {
    console.error("Error adding movie to screen:", error.message);
    res.status(500).json({ message: "Error adding movie to screen", error });
  }
};

// Example: Backend code to update movie schedules
const updateMovieSchedules = async (theatreId, screenId, movieId, newSchedules) => {
  try {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      throw new Error("Theatre not found");
    }

    // Find the screen within the theatre
    const screen = theatre.screens.find((screen) => screen._id.toString() === screenId);
    if (!screen) {
      throw new Error("Screen not found");
    }

    // Find the movie within the screen's schedules
    const movieScheduleIndex = screen.movieSchedules.findIndex(
      (schedule) => schedule.movieId._id.toString() === movieId
    );
    if (movieScheduleIndex === -1) {
      throw new Error("Movie not found in screen's schedules");
    }

    // Add the new schedules (showTimes and showDates)
    screen.movieSchedules[movieScheduleIndex].showTime.push(...newSchedules.showTime);
    screen.movieSchedules[movieScheduleIndex].showDate.push(...newSchedules.showDate);

    // Save the updated theatre
    await theatre.save();

    return { success: true, message: "Schedules updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
