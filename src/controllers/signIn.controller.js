import db from "../database/db.js";
import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuid } from "uuid";

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
    const userExists = await db.collection("user").findOne({ email });

    if (!userExists) {
      return res.sendStatus(401);
    }

    const validPassword = bcrypt.compareSync(password, userExists.password);

    if (!validPassword) {
      return res.sendStatus(401);
    }

    const sessionExists = db
      .collection("session")
      .findOne({ userId: userExists._id });

    if (sessionExists) {
      await db.collection("session").deleteOne({ userId: userExists._id });
    }

    const TOKEN = uuid();

    await db
      .collection("session")
      .insertOne({ userId: userExists._id, token: TOKEN });

    res.send({ username: userExists.name, token: TOKEN }).status(201);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

export default signInController;
