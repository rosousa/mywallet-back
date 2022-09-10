function signUp(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.sendStatus(401);
  }

  res.locals.userAuth = {
    name,
    email,
    password,
  };

  next();
}

function signIn(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendStatus(401);
  }

  res.locals.userCredentials = {
    email,
    password,
  };

  next();
}

export { signUp, signIn };
