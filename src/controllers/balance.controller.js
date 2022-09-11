import joi from "joi";
import db from "../database/db.js";

const tokenSchema = joi.string().min(1).required();

const balance = async (req, res) => {
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

    const transactionList = await db
      .collection("transaction")
      .find({ userId: validSession.userId })
      .toArray();

    const totalDeposit = transactionList
      .filter((transaction) => transaction.type === "deposit")
      .map((transaction) => transaction.value)
      .reduce((previous, current) => previous + current, 0);

    const totalWithdraw = transactionList
      .filter((transaction) => transaction.type === "withdraw")
      .map((transaction) => transaction.value)
      .reduce((previous, current) => previous + current, 0);

    const total = (totalDeposit - totalWithdraw) / 100;

    res.send({ balance: total.toFixed(2) });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default balance;
