// src/routes/index.ts
import { Router } from "express";
import recommendationRouter from "./recommendation.route.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authRouter from "./auth.route.js";

const router = Router();


// Mount all route modules
router.use("/", authRouter); 
router.use("/", authenticate, recommendationRouter); 

export default router;
