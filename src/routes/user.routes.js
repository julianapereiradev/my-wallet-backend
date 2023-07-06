import {Router} from 'express';
import { signup, signin } from '../controllers/user.controller.js';
import { validationschema } from '../middlewares/validationschema.middleware.js';
import { signinSchema, signupSchema } from '../schemas/user.schemas.js';

const userrouter = Router();

userrouter.post("/signup", validationschema(signupSchema), signup);
userrouter.post("/signin", validationschema(signinSchema), signin);

export default userrouter