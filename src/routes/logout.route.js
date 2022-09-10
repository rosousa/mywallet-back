import { Router } from "express";
import logoutController from "../controllers/logout.controller.js";
import statementMiddleware from "../middlewares/statement.middleware.js";

const logout = Router();

logout.delete("/wallet/logout", statementMiddleware, logoutController);

export default logout;
