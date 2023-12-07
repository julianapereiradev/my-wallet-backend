import * as transactionService from "../services/transaction.service.js";

export async function getTransaction(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Você não tem autorizacao para acessar");
  }

  try {
    const transactions = await transactionService.getTransactionsService(token);
    res.status(200).send(transactions);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function postTransaction(req, res) {
  const { value, description, type } = req.body;
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Você não tem autorizacao para acessar");
  }

  try {
    await transactionService.postTransactionService(
      value,
      description,
      type,
      token
    );
    res.status(201).send("Transação feita");
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
