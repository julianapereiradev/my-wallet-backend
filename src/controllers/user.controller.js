import { db } from "../app.js";
import { participantSchema, userSchema } from "../app.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export async function signup (req, res) {
    const { name, email, password } = req.body;
  
    const postParticipant = { name: name, email: email, password: password };
  
    const validation = participantSchema.validate(postParticipant, {
      abortEarly: false,
    });
  
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    try {
      const participantEmailExistsInParticipants = await db
        .collection("participants")
        .findOne({ email });
  
      if (participantEmailExistsInParticipants) {
        return res.status(409).send("Este email já existe no banco");
      }
  
      const hash = bcrypt.hashSync(password, 10);
  
      const newParticipant = { name: name, email: email, password: hash };
  
      await db.collection("participants").insertOne(newParticipant);
      res.status(201).send("Participante cadastrado");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };


  export async function signin (req, res) {
    const { email, password } = req.body;
  
    const postUser = { email: email, password: password };
  
    const validation = userSchema.validate(postUser, { abortEarly: false });
  
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    try {
      const user = await db.collection("participants").findOne({ email });
  
      if (!user) {
        return res.status(404).send("Este email não existe, crie uma conta");
      }
  
      if (bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.collection("sessions").insertOne({ idUser: user._id, token });
        res.status(200).send({name: user.name, userID: user._id, token});
      } else {
        res.status(401).send("Senha incorreta!");
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };