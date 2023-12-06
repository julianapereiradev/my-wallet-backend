import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.routes.js";
import transactionRouter from "./routers/transaction.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use(userRouter);
app.use(transactionRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));
