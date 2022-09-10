import { Router } from "express";
import transactionMiddleware from "../middlewares/transaction.middleware.js";
import depositController from "../controllers/deposit.controller.js";
import withdrawController from "../controllers/withdraw.controller.js";

const transactionRoutes = Router();

transactionRoutes.post(
  "/wallet/deposit",
  transactionMiddleware,
  depositController
);

transactionRoutes.post(
  "/wallet/withdraw",
  transactionMiddleware,
  withdrawController
);

export default transactionRoutes;
