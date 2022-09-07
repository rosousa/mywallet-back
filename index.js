import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("mywallet");
});

app.listen(4000, () => console.log("Running on port 4000"));
