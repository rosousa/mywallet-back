import db from "../database/db.js";
import bcrypt from "bcrypt";
import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});

const signInController = async (req, res) => {
  const { email, password } = res.locals.userCredentials;
  const CREDENTIALS = signInSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (CREDENTIALS.error) {
    return res.sendStatus(401);
  }

  try {
    const userExists = await db.collection("users").findOne({ email });

    if (!userExists) {
      return res.sendStatus(401);
    }

    const validPassword = bcrypt.compareSync(password, userExists.password);

    if (!validPassword) {
      return res.sendStatus(401);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

export default signInController;
