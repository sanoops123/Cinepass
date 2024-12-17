import express from "express";
import { createTheatre,getAllTheatres,getTheatreById,deleteTheatre, addMovieToTheatre, CreateKottaka,editTheatre} from "../controllers/theatreControllers.js";

import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/create-theatre",authAdmin, createTheatre);

// Route to fetch a theatre with screens by theatre ID
//router.get("/:id/screens", getTheatreWithScreens);

// Route to get all theatres with their screens and movie schedules
router.get("/get-theatres", getAllTheatres);

// Route to get a specific theatre by its ID with screens and movie schedules
router.get("/:id", getTheatreById);

// Route to delete a theatre by theatreId
router.delete("/delete-theatre/:id", authAdmin,deleteTheatre);

router.post("/:theatreId/Add-movies",authAdmin,addMovieToTheatre)

router.post("/Add-theatre",authAdmin,CreateKottaka)

router.put("/update-theatre/:theatreId",authAdmin, editTheatre);

export {router as theatreRoute}
