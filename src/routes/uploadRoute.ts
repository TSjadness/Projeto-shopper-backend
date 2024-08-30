import { Router } from "express";
import { uploadMeasure } from "../controllers/uploadController";

const router = Router();
router.post("/upload", uploadMeasure);

export default router;
