import {Router} from 'express';
import { signup, signin } from '../controllers/user.controller.js';

const userrouter = Router();

userrouter.post("/signup", signup);
userrouter.post("/signin", signin);

export default userrouter