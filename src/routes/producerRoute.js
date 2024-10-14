import express from "express";
import { getProducerAwardIntervals } from "../controller/producerController.js";

const router = express.Router();

router.get("/producers/awards-intervals", getProducerAwardIntervals);

export default router;
