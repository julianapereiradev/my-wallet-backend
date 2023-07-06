import { db } from "../mongodatabase/database.js";
import dayjs from "dayjs";

export async function gettransaction (req, res) {
    const { authorization } = req.headers;
  
    const token = authorization?.replace("Bearer ", ""); // ? significa optional chain
    if (!token) return res.status(401).send("Você não tem autorizacao para acessar");
  
    try {
      const session = await db.collection("sessions").findOne({ token });
      if (!session)
        return res.status(401).send("Não foi encontrado o token no banco");
  
      const transactions = await db.collection("transactions").find({idUser: session.idUser}).toArray();
      res.status(200).send(transactions);
    } catch (err) {
      return res.status(500).send(err.message);
    }
};


export async function posttransaction (req, res) {
    const { value, description, type } = req.body;
  
    const { authorization } = req.headers;
  
    const token = authorization?.replace("Bearer ", ""); // ? significa optional chain
  
    if (!token) return res.status(401).send("Você não tem autorizacao para acessar");
  
    try {
      const session = await db.collection("sessions").findOne({ token });
      if (!session) return res.status(401).send("Esse token não existe");
  
      await db
        .collection("transactions")
        .insertOne({
          value: value,
          description: description,
          type: type,
          date: dayjs().format("DD/MM"),
          idUser: session.idUser,
        });
      res.status(201).send("Transação feita");
    } catch (err) {
      return res.status(500).send(err.message);
    }
};
