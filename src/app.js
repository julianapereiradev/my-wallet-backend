import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import joi from 'joi'

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
    passwordagain: joi.string().required().min(3),
});

const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3),
});


//Cadastro:
app.post("/participants", async (req, res) => {
    const { name, email, password, passwordagain} = req.body;
  
    const postParticipant = { name: name, email: email, password: password, passwordagain: passwordagain }
  
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
    
      const newParticipant = { name: name, email: email, password: password };
      
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

        if (user.password !== password) {
            return res.status(401).send("Senha incorreta");
        }

        // Aqui você pode retornar informações adicionais do usuário, se necessário
        return res.send(user);

    } catch (err) {
        return res.status(500).send(err.message);
    }
});


//PORT:
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`O servidor está rodando na porta ${PORT}!`)
);
