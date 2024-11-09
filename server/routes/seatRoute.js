import express from 'express'
const router = express.Router() 
import {getSeats} from "../controllers/seatControllers.js"

router.get('/:screenId/:showTime', getSeats);



export {router as seatRouter}