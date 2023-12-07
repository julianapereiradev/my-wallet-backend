//import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import * as userRepository from "../repositories/user.repository.js";

export async function signupService(name, email, password) {
  const newEmailExistsInSignUpEmails = await userRepository.findByEmail(email);

  if (newEmailExistsInSignUpEmails) {
    throw new Error("Este email já existe no banco");
  }

  const hash = bcrypt.hashSync(password, 10);

  const newUser = { name, email, password: hash };

  await userRepository.createUser(newUser);
}

export async function signinService(email, password) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Este email não existe, crie uma conta");
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await userRepository.createSession(user._id, token);
    return { name: user.name, userID: user._id, token };
  } else {
    throw new Error("Senha incorreta!");
  }
}
