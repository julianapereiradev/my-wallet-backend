import {Router} from 'express';
import { gettransaction, posttransaction } from '../controllers/transaction.controller.js';

const transactionrouter = Router();

transactionrouter.get("/transaction", gettransaction);
transactionrouter.post("/transaction", posttransaction);

export default transactionrouter