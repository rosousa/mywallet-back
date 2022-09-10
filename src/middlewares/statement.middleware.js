function statement(req, res, next) {
  const { token } = req.headers;

  if (!token) {
    return res.sendStatus(401);
  }

  res.locals.token = token;

  next();
}

export default statement;
