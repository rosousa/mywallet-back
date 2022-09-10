import joi from "joi";
import db from "../database/db.js";
import dayjs from "dayjs";

const withdrawSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().min(1).required(),
  token: joi.string().min(1).required(),
});

const withdraw = async (req, res) => {
  let { value, description, token } = res.locals.transactionInfo;

  const validWithdraw = withdrawSchema.validate({ value, description, token });

  if (validWithdraw.error) {
    console.log(validWithdraw.error);
    return res.sendStatus(401);
  }

  if (!token.includes("Bearer")) {
    return res.sendStatus(401);
  }

  token = token.replace("Bearer ", "");

  try {
    const sessionExists = await db.collection("session").findOne({ token });

    if (!sessionExists) {
      return res.sendStatus(401);
    }

    const date = dayjs().format("DD/MM");

    await db.collection("transaction").insertOne({
      userId: sessionExists.userId,
      value: value * 100,
      description,
      type: "withdraw",
      date,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

export default withdraw;
