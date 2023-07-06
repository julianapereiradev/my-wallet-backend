import {Router} from 'express';
import { signup, signin } from '../controllers/user.controller.js';

const userrouter = Router();

userrouter.post("/participants", signup);
userrouter.post("/user", signin);

export default userrouter