import express from 'express'

const router = express.Router() 
import { userRouter } from './userRoute.js'
import { adminRouter } from './adminRoute.js'
import { moviesRouter } from './moviesRoute.js'
import { bookingRouter } from './bookingRoute.js'
import { screenRouter } from './screenRoute.js'
import {seatRouter} from "./seatRoute.js"
import { paymentRoute } from './paymentRoute.js'
import { theatreRoute } from './theatreRoute.js'



router.use("/user",userRouter)
router.use("/admin",adminRouter)
router.use("/movie",moviesRouter)
router.use("/booking",bookingRouter)
router.use("/screen",screenRouter)
router.use("/seat",seatRouter)
router.use("/payments",paymentRoute)
router.use("/theatre",theatreRoute)


router.get('/health', (req, res) => {
    res.json({ message: 'API is healthy!' });
  });
  router.get('/', (req, res) => {
    res.json({ message: 'API Root Endpoint' });
  });
export {router as apiRoute}