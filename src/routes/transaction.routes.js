import {Router} from 'express';
import { gettransaction, posttransaction } from '../controllers/transaction.controller.js';

const transactionrouter = Router();

transactionrouter.get("/operations", gettransaction);
transactionrouter.post("/operations", posttransaction);

export default transactionrouter