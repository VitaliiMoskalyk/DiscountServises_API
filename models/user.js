const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Joi = require("joi");

const regexExpression = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/;

const User = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: regexExpression,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    // token: {
    //   type: String,
    //   default: null,
    // },
    // avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    verificationCode: {
      type: String,
      required: [true, "Verification code is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const JoiUserSchema = Joi.object({
  password: Joi.string().min(6).max(10).required(),
  email: Joi.string().pattern(regexExpression).required(),
  name: Joi.string().min(6).max(10).required(),
  token: Joi.string(),
  verificationCode: Joi.string().min(6).max(20),
  verify: Joi.boolean(),
});

const JoiVerifySchema = Joi.object({
  email: Joi.string().pattern(regexExpression).required(),
});

const UserModel = mongoose.model("user", User);

module.exports = {
  UserModel,
  JoiUserSchema,
  JoiVerifySchema,
};
