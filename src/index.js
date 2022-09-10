import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.listen(4000, () => console.log("Running on port 4000"));
