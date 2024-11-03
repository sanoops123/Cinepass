import { Screen } from "../models/screenModel.js";

export const createScreen = async (req, res, next) => {
  try {
    const { name, location, city, screenType, seats, movieSchedules } =
      req.body;

    const newScreen = new Screen({
      name,
      location,
      city,
      screenType,
      seats, // Make sure this is an array of seat objects
      movieSchedules, // Optional, can be empty
    });
    await newScreen.save();

    res.status(201).json({ message: "Screen created successfully", newScreen });
  } catch (error) {
    res.status(500).json({ message: "Error creating screen", error });
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
    console.log("Screen ID:", req.params.id); // Log the screen ID
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

export const updateScreen = async (req, res, next) => {
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
