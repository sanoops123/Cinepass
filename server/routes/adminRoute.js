import express from 'express'
import { adminLogin, adminLogOut, adminProfile, adminSignup, checkAdmin, getAllBookings } from '../controllers/adminControllers.js'
import { authAdmin } from '../middleware/authAdmin.js'
import { updateAdminProfile } from '../controllers/adminControllers.js'


const router = express.Router() 

router.post("/sign-up",adminSignup)

router.post("/log-in",adminLogin )

router.get("/profile",authAdmin,adminProfile)

router.put("/profile-update",authAdmin, updateAdminProfile)

router.delete("/profile-delete", authAdmin)

router.post("/log-out",authAdmin,adminLogOut)

router.get("/check-admin",authAdmin,checkAdmin)

router.get("/get-allBookings",authAdmin,getAllBookings)
export {router as adminRouter}