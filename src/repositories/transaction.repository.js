import { db } from "../database/database.js";

export async function getSessionByToken(token) {
  return await db.collection("sessions").findOne({ token });
}

export async function getTransactionsByUserId(userId) {
  return await db.collection("transactions").find({ idUser: userId }).toArray();
}

export async function createTransaction(transactionData) {
  await db.collection("transactions").insertOne(transactionData);
}
