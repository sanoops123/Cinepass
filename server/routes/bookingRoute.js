
import express from 'express'
import { movieBooking ,cancelBooking} from '../controllers/bookingControllers.js'
const router = express.Router() 

router.post("/movie-booking/",movieBooking)

router.delete("/cancel/:id",cancelBooking)



export {router as bookingRouter}