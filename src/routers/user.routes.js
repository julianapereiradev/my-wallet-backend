import { Router } from "express";
import { postSignup, postSignin } from "../controllers/user.controller.js";
import { validationSchema } from "../middlewares/validationSchema.middleware.js";
import { signinSchema, signupSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/signup", validationSchema(signupSchema), postSignup);
userRouter.post("/signin", validationSchema(signinSchema), postSignin);

export default userRouter;
