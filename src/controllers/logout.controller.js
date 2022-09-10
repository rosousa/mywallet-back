import joi from "joi";
import db from "../database/db.js";

const tokenSchema = joi.string().min(1).required();

const logout = async (req, res) => {
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

    await db.collection("session").deleteOne({ token });

    res.send();
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export default logout;
