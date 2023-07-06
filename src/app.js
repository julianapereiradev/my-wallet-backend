import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userrouter from "./routes/user.routes.js";
import transactionrouter from "./routes/transaction.routes.js";

//Settings:
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(userrouter)
app.use(transactionrouter)



//PORT:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`O servidor está rodando na porta ${PORT}`)
);
