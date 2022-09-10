import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import statementRoute from "./routes/statement.route.js";
import logoutRoute from "./routes/logout.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(transactionRoutes);
app.use(statementRoute);
app.use(logoutRoute);

app.listen(4000, () => console.log("Running on port 4000"));
