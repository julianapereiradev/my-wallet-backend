import joi from "joi";

export const participantSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3),
  });
  
  export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3),
  });