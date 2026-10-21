import express from "express";

import {
    createAnalysis,
    getAnalyses
} from "../controllers/analysisController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    createAnalysis
);

router.get(
    "/",
    authenticate,
    getAnalyses
);

export default router;