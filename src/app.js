import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import joi from 'joi';
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dayjs from 'dayjs';

//Settings:
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (err) {
  (err) => console.log(err.message);
}
const db = mongoClient.db();


//Joi Schemas:
const participantSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3),
});

const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3),
});


//Cadastro:
app.post("/participants", async (req, res) => {
    const { name, email, password } = req.body;
  
    const postParticipant = { name: name, email: email, password: password }
  
    const validation = participantSchema.validate(postParticipant, { abortEarly: false });
  
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    try {
    const participantEmailExistsInParticipants = await db.collection("participants").findOne({ email });
  
    if(participantEmailExistsInParticipants) {
      return res.status(409).send("Este email já existe no banco");
    }
    
    const hash = bcrypt.hashSync(password, 10);

      const newParticipant = { name: name, email: email, password: hash };
      
      await db.collection("participants").insertOne(newParticipant);
      res.sendStatus(201)
  
  } catch(err) {
      return res.status(500).send(err.message)
  }
  });

app.get("/participants", async (req, res) => {
    try {
      const data = await db.collection("participants").find().toArray();
      return res.send(data);
  
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });


//Login:
app.post("/user", async (req, res) => {
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
          const token = uuid()
          await db.collection("sessions").insertOne({idUser: user._id, token})
        res.status(200).send(token)
        } else {
          res.status(401).send("Senha incorreta!")
        }

        // if (user.password !== password) {
        //     return res.status(401).send("Senha incorreta");
        // }

        // Aqui você pode retornar informações adicionais do usuário, se necessário
        // return res.send(user);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

//Operations:
app.get("/operations", async (req, res) => {
  try {

const operations = await db.collection("operations").find().toArray();
res.status(200).send(operations)

  } catch (err) {
    return res.status(500).send(err.message);
  }
})

app.post("/operations", async (req, res) => {
  const {value, description, type} = req.body;

  try {
    
    await db.collection("operations").insertOne({value: value, description: description, type: type, date: dayjs().format('DD/MM')})
    res.status(201).send("Operação criada")

  } catch (err) {
    return res.status(500).send(err.message);
  }
})


//PORT:
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`O servidor está rodando na porta ${PORT}!`)
);
