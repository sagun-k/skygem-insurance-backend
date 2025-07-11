import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma.js";
import { RecommendationController } from "../controllers/recommendation.controller.js";

const recommendationRouter = Router();
const controller = new RecommendationController();


/**
 * @swagger
 * /v1/recommendation:
 *   post:
 *     operationId: submitInsuranceRecommendationRequest
 *     summary: Submit insurance form and receive recommendation
 *     tags: [Recommendation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: integer
 *                 example: 35
 *               income:
 *                 type: number
 *                 example: 50000
 *               dependents:
 *                 type: integer
 *                 example: 2
 *               riskTolerance:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: "medium"
 *               userEmail:
 *                  type: string
 *                  example: "user@skygem.com"
 *     responses:
 *       200:
 *         description: Recommendation response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendation:
 *                   type: string
 *                   example: "Term Life Insurance"
 *                 monthlyPremium:
 *                   type: string
 *                   example: "$123.45"
 */
recommendationRouter.post("/recommendation", controller.submitRecommendation);

export default recommendationRouter;
