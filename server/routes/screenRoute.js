
import { authAdmin } from "../middleware/authAdmin.js";
import express from 'express'
import { createScreen,deleteScreen,getAllScreens, addMovieToScreen, deleteMovieFromScreen,getScreenById ,editScreen,getScreensByMovieId,getScreensByTheatreId,deleteScreenFromTheatre, addScreensToTheatre} from "../controllers/screenControllers.js";
const router = express.Router()


router.post("/create-screen",authAdmin,createScreen)

router.get('/get-screens', getAllScreens);

router.get('/screenbyid/:id',getScreenById)

router.get('/by-movie/:movieId', getScreensByMovieId);

//router.put('/update-screen/:id',authAdmin,editScreen)
router.put("/:theatreId/update-screens/:screenId",authAdmin, editScreen);

router.delete('/delete-screen/:id',authAdmin,deleteScreen)


// Get screens by theatre ID
router.get("/:theatreId/screens", getScreensByTheatreId);

// Delete a screen from a theatre
router.delete("/:theatreId/screens/:screenId",authAdmin, deleteScreenFromTheatre);

router.delete("/:screenId/movies/:movieId", authAdmin,deleteMovieFromScreen);

//router.post("/:theatreId/Add-screen", createScreenForTheatre);

router.post("/:theatreId/Add-screen",authAdmin,addScreensToTheatre );

// Add a movie to a specific screen
router.post("/:screenId/Add-movies", authAdmin, addMovieToScreen);

router.post("/:screenId/Add-movies", authAdmin, );


export {router as screenRouter}