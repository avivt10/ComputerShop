const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");
require("dotenv").config();

const register = async (req, res, next) => {
  const { firstName, lastName,role, email, password } = req.body;
  let existUser;
  try {
    existUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }
  if (existUser) {

    const error = new HttpError("User exist! try again", 422);
    res.status(422).json({
      message: "User exist! try again",
    });
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user", 500);
    return next(error);
  }
  const createdUser = new User({
    firstName,
    lastName,
    role,
    email,
    password: hashedPassword,
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed, please try again", 500);
    res.status(401).json({
      message:"register failed!"
    })
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "5h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    role:createdUser.role,
    token: token,
    firstName: createdUser.firstName,
    message: "Sign up successful",
  });
};

exports.register = register;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let isEqual = false;
  let existUser;
  let token;
  try {
    existUser = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }
  try {
    if (existUser) {
      console.log(existUser);
      isEqual = await bcrypt.compare(password, existUser.password);
      if (isEqual) {
         token = await jwt.sign(
          {
            email: existUser.email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "5h",
          }
        );
      }
      else{
        return(
          res.status(500).json({
            message:"Login Failed! try again"
          })
        )
      }
    }
   
    else{
      return(
        res.status(401).json({
          message:"Login Failed! try again"
        })
      )
    }
  } catch (err) {
    const error = new HttpError("Login Failed! try again", 500);
    return next(error);
  }
    res.status(200).json({
      id : existUser._id,
      token: token,
      role:existUser.role,
      firstName: existUser.firstName,
      message: "login successful",
    });
    
};
exports.login = login;
