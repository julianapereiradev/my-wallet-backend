import { db } from "../mongodatabase/database.js";
import { transactionSchema } from "../schemas/transaction.schemas.js";
import dayjs from "dayjs";

export async function gettransaction (req, res) {
    const { authorization } = req.headers;
  
    const token = authorization?.replace("Bearer ", ""); // ? significa optional chain
    if (!token) return res.status(401).send("nao tem autorizacao para acessar");
  
    try {
      const session = await db.collection("sessions").findOne({ token });
      if (!session)
        return res.status(401).send("Nao encontrou token no banco de sessoes");
  
      const transactions = await db.collection("transactions").find({idUser: session.idUser}).toArray();
      res.status(200).send(transactions);
    } catch (err) {
      return res.status(500).send(err.message);
    }
};


export async function posttransaction (req, res) {
    const { value, description, type } = req.body;
  
    const { authorization } = req.headers;
  
    const posttransaction = { value: value, description: description, type: type };
  
    const validation = transactionSchema.validate(posttransaction, {
      abortEarly: false,
    });
  
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
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
