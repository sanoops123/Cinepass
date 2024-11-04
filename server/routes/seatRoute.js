import express from 'express'
const router = express.Router() 
import {getSeats} from "../controllers/seatControllers.js"

// Example route in your server
router.get('/:screenId/:showTime', getSeats);



export {router as seatRouter}