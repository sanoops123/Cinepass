import express from 'express'
import { adminLogin, adminLogOut, adminProfile, adminSignup, checkAdmin } from '../controllers/adminControllers.js'
import { authAdmin } from '../middleware/authAdmin.js'
const router = express.Router() 

router.post("/sign-up",adminSignup)

router.post("/log-in", adminLogin )

router.get("/profile",authAdmin,adminProfile)

router.put("/profile-update",)

router.delete("/profile-delete",)

router.post("/log-out",authAdmin,adminLogOut)

router.get("/check-admin",authAdmin,checkAdmin)


export {router as adminRouter}