import express from "express";
import produceRouter from "./producerRoute.js";

const router = express.Router();

router.use(produceRouter);

export default router;
