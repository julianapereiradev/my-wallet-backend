import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import joi from "joi";
import { signin, signup } from "./controllers/user.controller.js";
import { gettransaction, posttransaction } from "./controllers/transaction.controller.js";
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

//Joi Schemas:
export const participantSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(3),
});

export const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(3),
});

export const operationSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid("entrada", "saida").required(),
});

// //Cadastro:
// app.post("/participants", signup);

// //Login:
// app.post("/user", signin);

// //Operations:
// app.get("/operations", gettransaction);

// app.post("/operations", posttransaction);

//PORT:
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`O servidor está rodando na porta ${PORT}!`)
);
