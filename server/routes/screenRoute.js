
import { authAdmin } from "../middleware/authAdmin.js";
import express from 'express'
import { createScreen,deleteScreen,getAllScreens, getScreenById, updateScreen ,getScreensByMovieId} from "../controllers/screenControllers.js";
const router = express.Router()


router.post("/create-screen",authAdmin,createScreen)

router.get('/get-screens', getAllScreens);

router.get('/screenbyid/:id',getScreenById)

router.get('/by-movie/:movieId', getScreensByMovieId);

router.put('/update-screen/:id',authAdmin,updateScreen)

router.delete('/delete-screen/:id',authAdmin,deleteScreen)


export {router as screenRouter}