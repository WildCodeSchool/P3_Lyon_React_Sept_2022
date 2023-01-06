const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TIMING } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2

    .hash(req.body.password, hashingOptions)

    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      console.log(hashedPassword);

      delete req.body.password;

      next();
    })

    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.user_password, req.body.password, hashingOptions)
    .then((isVerified) => {
      if (isVerified) {
        const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: JWT_TIMING,
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else res.sendStatus(401);
    })
    .catch((err) => {
      // do something with err
      console.error(err);
      res.sendStatus(400);
    });
};

module.exports = {
  hashPassword,
  verifyPassword,
};
