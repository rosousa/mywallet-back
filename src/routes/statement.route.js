import { Router } from "express";
import balanceController from "../controllers/balance.controller.js";
import statementController from "../controllers/statement.controller.js";
import statementMiddleware from "../middlewares/statement.middleware.js";

const statement = Router();

statement.get("/wallet/transactions", statementMiddleware, statementController);
statement.get("/wallet/balance", statementMiddleware, balanceController);

export default statement;
