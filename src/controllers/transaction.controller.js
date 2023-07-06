import { db } from "../app.js";
import { operationSchema } from "../schemas/transaction.schemas.js";
import dayjs from "dayjs";

export async function gettransaction (req, res) {
    const { authorization } = req.headers;
  
    const token = authorization?.replace("Bearer ", ""); // ? significa optional chain
    if (!token) return res.status(401).send("nao tem autorizacao para acessar");
  
    try {
      const sessao = await db.collection("sessions").findOne({ token });
      if (!sessao)
        return res.status(401).send("Nao encontrou token no banco de sessoes");
  
      const operations = await db.collection("operations").find({idUser: sessao.idUser}).toArray();
      res.status(200).send(operations);
    } catch (err) {
      return res.status(500).send(err.message);
    }
};


export async function posttransaction (req, res) {
    const { value, description, type } = req.body;
  
    const { authorization } = req.headers;
  
    const postOperation = { value: value, description: description, type: type };
  
    const validation = operationSchema.validate(postOperation, {
      abortEarly: false,
    });
  
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    const token = authorization?.replace("Bearer ", ""); // ? significa optional chain
  
    if (!token) return res.status(401).send("nao tem autorizacao para acessar");
  
    try {
      const sessao = await db.collection("sessions").findOne({ token });
      if (!sessao) return res.status(401).send("Esse token n existe");
  
      await db
        .collection("operations")
        .insertOne({
          value: value,
          description: description,
          type: type,
          date: dayjs().format("DD/MM"),
          idUser: sessao.idUser,
        });
      res.status(201).send("Operação criada");
    } catch (err) {
      return res.status(500).send(err.message);
    }
};
