const jwt = require("jwt-simple");
const User = require("../models/user");
const { secret } = require("../config");

const tokenForUser = ({ id }) => {
  const iat = Date.now();
  return jwt.encode({ sub: id, iat }, secret);
};

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password)
    return res.status(422).send({ error: "Please provide email and password" });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(422).send({ error: "Email already in use" });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    try {
      const user = await newUser.save();

      res.json({ token: tokenForUser(user) });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

const signin = async (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

module.exports = {
  signup,
  signin
};
