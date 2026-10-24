import express from "express";
import multer from "multer";

import {
    createAnalysis,
    getAnalyses
} from "../controllers/analysisController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

//Configure multer to hold the uploaded files in memory
const upload=multer({storage: multer.memoryStorage()});

router.post(
    "/",
    authenticate,
    upload.fields([
        { name: 'resumeFile', maxCount: 1 },
        { name: 'jdFile', maxCount: 1 }
    ]),
    createAnalysis
);

router.get(
    "/",
    authenticate,
    getAnalyses
);

export default router;