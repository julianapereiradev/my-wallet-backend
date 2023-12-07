/*import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function postSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    const newEmailExistsInSignUpEmails = await db
      .collection("users")
      .findOne({ email });

    if (newEmailExistsInSignUpEmails) {
      return res.status(409).send("Este email já existe no banco");
    }

    const hash = bcrypt.hashSync(password, 10);

    const newsignup = { name: name, email: email, password: hash };

    await db.collection("users").insertOne(newsignup);
    res.status(201).send("Usuário cadastrado!");
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function postSignin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).send("Este email não existe, crie uma conta");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ idUser: user._id, token });
      res.status(200).send({ name: user.name, userID: user._id, token });
    } else {
      res.status(401).send("Senha incorreta!");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
*/

import * as userService from "../services/user.service.js";

export async function postSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    await userService.signupService(name, email, password);
    res.status(201).send("Usuário cadastrado!");
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function postSignin(req, res) {
  const { email, password } = req.body;

  try {
    const result = await userService.signinService(email, password);
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
