import dayjs from "dayjs";
import * as transactionRepository from "../repositories/transaction.repository.js";

export async function getTransactionsService(token) {
  const session = await transactionRepository.getSessionByToken(token);

  if (!session) {
    throw new Error("Não foi encontrado o token no banco");
  }

  return transactionRepository.getTransactionsByUserId(session.idUser);
}

export async function postTransactionService(value, description, type, token) {
  const session = await transactionRepository.getSessionByToken(token);

  if (!session) {
    throw new Error("Esse token não existe");
  }

  const transactionData = {
    value,
    description,
    type,
    date: dayjs().format("DD/MM"),
    idUser: session.idUser,
  };

  await transactionRepository.createTransaction(transactionData);
}
