import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import userrouter from "./routes/user.routes.js";
import transactionrouter from "./routes/transaction.routes.js";

//Settings:
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

app.use(userrouter)
app.use(transactionrouter)

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (err) {
  (err) => console.log(err.message);
}
export const db = mongoClient.db();

//PORT:
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`O servidor está rodando na porta ${PORT}!`)
);
