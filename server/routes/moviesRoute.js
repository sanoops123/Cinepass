import express from 'express'
import { addMovie, deleteMovie, getMovieById, getMovies, updateMovie,getNowShowingMovies ,getUpcomingMovies} from '../controllers/movieControllers.js'
import { authAdmin } from '../middleware/authAdmin.js'
const router =express.Router()


router.post("/add-movies",authAdmin, addMovie)

router.get("/get-movies",getMovies)

router.get("/movie-byid/:id",getMovieById)

router.put("/movie-update/:id",updateMovie)

router.delete("/movie-delete/:id",authAdmin,deleteMovie)

router.get("/now-showing", getNowShowingMovies)

router.get("/upcoming",getUpcomingMovies )


export {router as moviesRouter}