import { User } from "../schemas/index.js";
import { errorList, successList } from "../utils/Errors.js";
import mongoose from "mongoose";
import {
  checkValidString,
  checkValidEmail,
  checkValidPassword,
} from "../utils/index.js";

const createUser = async (req, res) => {
  const { firstName, lastName, email, age, phone, password, googleId } =
    req.body;
  try {
    if (
      checkValidString(firstName) &&
      checkValidEmail(email) &&
      (checkValidPassword(password) || checkValidString(googleId))
    ) {
      console.log({ firstName, lastName, email, User });
      const userFound = await User.findOne({
        email,
      });
      console.log({ userFound, val: mongoose.connection.readyState });
      if (!userFound) {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          firstName,
          lastName,
          email,
          age,
          phone,
          password: password || googleId,
        });
        await newUser.save();
        try {
          console.log("User saved successfully");
          res.send({
            error: false,
            message: successList.CREATE_USER,
          });
        } catch (saveError) {
          console.error("Error saving user:", saveError);
          res.send({
            error: true,
            message: errorList.INTERNAL_ERROR,
            details: saveError,
          });
        }
      } else {
        res.send({
          error: true,
          message: errorList.EMAIL_ALREADY_EXIST,
        });
      }
    } else {
      res.send({
        error: true,
        message: errorList.USER_DETAILS_REQUIRED,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      error: true,
      message: errorList.INTERNAL_ERROR,
      details: e,
    });
  }
};

export default createUser;
