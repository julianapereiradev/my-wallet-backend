import { Router } from "express";
import {
  getTransaction,
  postTransaction,
} from "../controllers/transaction.controller.js";
import { validationSchema } from "../middlewares/validationSchema.middleware.js";
import { transactionSchema } from "../schemas/transaction.schemas.js";

const transactionRouter = Router();

transactionRouter.get("/transaction", getTransaction);
transactionRouter.post(
  "/transaction",
  validationSchema(transactionSchema),
  postTransaction
);

export default transactionRouter;
