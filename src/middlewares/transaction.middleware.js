function transaction(req, res, next) {
  const { token } = req.headers;
  const { value, description } = req.body;

  if (!value || !description || !token) {
    return res.sendStatus(401);
  }

  res.locals.transactionInfo = { value, description, token };

  next();
}

export default transaction;
