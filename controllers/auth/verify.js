const { UserModel } = require("../../models/user");

const verify = async (req, res, next) => {
  try {
    const { code, email } = req.body;
    const user = await UserModel.findOne({ email });

    if (code === user.verificationCode) {
      await UserModel.findOneAndUpdate({ email }, { verify: true });
      return res.status(201).json({
        message: "Verification success",
      });
    } else {
      return res.status(404).json({
        message: "Verification failed",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
