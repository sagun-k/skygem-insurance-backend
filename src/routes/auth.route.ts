import { Router } from "express";
import { AuthenticationController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRouter = Router();

const controller = new AuthenticationController();

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     operationId: registerUser
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: user123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid input or user already exists
 */
authRouter.post("/auth/register", controller.register);

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Login a user
 *     operationId: loginUser
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: user123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/auth/login", controller.login);

/**
 * @swagger
 * /v1/auth/verify-token:
 *   get:
 *     summary: Verify JWT token and return user email
 *     operationId: verifyToken
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       401:
 *         description: Invalid or expired token
 */
authRouter.get("/auth/verify-token", authenticate, controller.verifyToken);


export default authRouter;
