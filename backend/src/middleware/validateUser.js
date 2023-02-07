const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }

  userSchema.validate({ email, password });
};

module.exports = validateUser;
