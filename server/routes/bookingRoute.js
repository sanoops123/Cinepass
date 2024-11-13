
import express from 'express'
import { movieBooking ,cancelBooking} from '../controllers/bookingControllers.js'
import { authUser } from '../middleware/authUser.js'
const router = express.Router() 

router.post("/movie-booking/",authUser,movieBooking)

router.delete("/cancel/:id",authUser,cancelBooking)



export {router as bookingRouter}