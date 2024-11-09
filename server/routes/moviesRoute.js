import express from 'express'
import { addMovie, deleteMovie, getMovieById, getMovies, updateMovie,getNowShowingMovies ,getUpcomingMovies,searchMovies} from '../controllers/movieControllers.js'
import { authAdmin } from '../middleware/authAdmin.js'
import { upload } from "../middleware/multer.js";
const router =express.Router()

router.post("/add-movies", upload.single('posterUrl'),authAdmin, addMovie)

router.get("/get-movies",getMovies)

router.get("/movie-byid/:id",getMovieById)

router.put("/movie-update/:id",authAdmin,updateMovie)

router.delete("/movie-delete/:id",authAdmin,deleteMovie)

router.get("/now-showing", getNowShowingMovies)

router.get("/upcoming",getUpcomingMovies )

router.get('/search',searchMovies)

export {router as moviesRouter}