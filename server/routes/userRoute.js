import express from 'express'
import {  checkUser, getBookingsByUser, userLogin, userLogOut, userProfile, userSignup } from '../controllers/userControllers.js'
import { authUser } from '../middleware/authUser.js'
const router = express.Router() 

router.post("/sign-up", userSignup)

router.post("/log-in", userLogin)

router.get("/profile/",authUser, userProfile)

router.put("/profile-update",authUser)

router.delete("/profile-delete",authUser)

router.post("/log-out",authUser,userLogOut)

router.get("/check-user",authUser,checkUser)

router.get("/my-bookings/:userId", authUser,getBookingsByUser)


export {router as userRouter}