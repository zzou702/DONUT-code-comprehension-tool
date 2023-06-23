import express from "express";
import ai from "./ai.js";

const router = express.Router();

router.use("/ai", ai);

export default router;
