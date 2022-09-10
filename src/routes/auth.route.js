import { Router } from "express";
import * as authMiddleware from "../middlewares/authorization.middleware.js";
import signUpController from "../controllers/signUp.controller.js";
import signInController from "../controllers/signIn.controller.js";

const authRoutes = Router();

authRoutes.post("/sign-up", authMiddleware.signUp, signUpController);
authRoutes.post("/sign-in", authMiddleware.signIn, signInController);

export default authRoutes;
