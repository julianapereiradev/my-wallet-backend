import {Router} from 'express';
import { gettransaction, posttransaction } from '../controllers/transaction.controller.js';
import { validationschema } from '../middlewares/validationschema.middleware.js';
import { transactionSchema } from '../schemas/transaction.schemas.js';

const transactionrouter = Router();

transactionrouter.get("/transaction", gettransaction);
transactionrouter.post("/transaction", validationschema(transactionSchema), posttransaction);

export default transactionrouter