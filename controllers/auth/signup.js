const { UserModel, JoiUserSchema } = require("../../models/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const { error } = JoiUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Joi or another validation error",
      });
    }
    const { email, password, name } = req.body;
    const user = await UserModel.findOne({ email });
    if (user)
      return res.status(409).json({
        message: "User`s email in use",
      });

    const salt = bcrypt.genSaltSync(10);
    const passwordToSave = bcrypt.hashSync(password, salt);
    const token = uuidv4();

    await UserModel.create({
      email,
      password: passwordToSave,
      name,
      verificationToken: token,
    });
    res.status(201).json({
      user: {
        email,
      },
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
