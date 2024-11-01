import express from 'express'

const router = express.Router() 
import { userRouter } from './userRoute.js'
import { adminRouter } from './adminRoute.js'
import { moviesRouter } from './moviesRoute.js'
import { bookingRouter } from './bookingRoute.js'
import { screenRouter } from './screenRoute.js'


router.use("/user",userRouter)
router.use("/admin",adminRouter)
router.use("/movie",moviesRouter)
router.use("/booking",bookingRouter)
router.use("/screen",screenRouter)





export {router as apiRoute}