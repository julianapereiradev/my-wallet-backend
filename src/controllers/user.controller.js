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
