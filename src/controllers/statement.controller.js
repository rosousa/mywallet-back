import joi from "joi";
import db from "../database/db.js";

const tokenSchema = joi.string().min(1).required();

const statement = async (req, res) => {
  let token = res.locals.token;

  const validToken = tokenSchema.validate(token);

  if (validToken.error) {
    return res.sendStatus(401);
  }

  if (!token.includes("Bearer")) {
    return res.sendStatus(401);
  }

  token = token.replace("Bearer ", "");

  try {
    const validSession = await db.collection("session").findOne({ token });

    if (!validSession) {
      return res.sendStatus(401);
    }

    const EXTRACT = await db
      .collection("transaction")
      .find({ userId: validSession.userId })
      .toArray();

    res.send(EXTRACT).status(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export default statement;
