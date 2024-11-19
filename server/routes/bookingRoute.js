
import express from 'express'
import { cancelBooking,movieBooking } from '../controllers/bookingControllers.js'
import { authUser } from '../middleware/authUser.js'
const router = express.Router() 


router.post("/moviebooking",authUser,movieBooking)
router.delete("/cancel/:id",authUser,cancelBooking)

//router.get("/getbookings",authUser,getBookings)


export {router as bookingRouter}