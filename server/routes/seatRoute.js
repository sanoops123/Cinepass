import express from 'express'
const router = express.Router() 
import {getSeats, updateSeatAvailability} from "../controllers/seatControllers.js"

router.get('/:screenId/:showTime', getSeats);

router.get('/availability',updateSeatAvailability)


export {router as seatRouter}