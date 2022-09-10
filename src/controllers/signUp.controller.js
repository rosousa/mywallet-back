import db from "../database/db.js";
import bcrypt from "bcrypt";
import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().alphanum().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});

const signUpController = async (req, res) => {
  const { name, email, password } = res.locals.userAuth;

  const AUTH = signUpSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );

  if (AUTH.error) {
    return res.sendStatus(401);
  }

  try {
    const userExists = await db.collection("user").findOne({ email });

    if (userExists) {
      return res.sendStatus(409);
    }

    await db
      .collection("user")
      .insertOne({ name, email, password: bcrypt.hashSync(password, 10) });
    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

export default signUpController;
