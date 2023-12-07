import { db } from "../database/database.js";

export async function findByEmail(email) {
  return await db.collection("users").findOne({ email });
}

export async function createUser(user) {
  await db.collection("users").insertOne(user);
}

export async function createSession(userId, token) {
  await db.collection("sessions").insertOne({ idUser: userId, token });
}
