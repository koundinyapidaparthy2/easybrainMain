import { User } from "../../schemas/index.js";
import { errorList, successList } from "../../utils/Errors.js";
import mongoose from "mongoose";
import {
  checkValidString,
  checkValidEmail,
  checkValidPassword,
} from "../../utils/index.js";

import bcrypt from "bcrypt";
import loginUser from "./loginUser.js";

const createUser = async (req, res) => {
  const { firstName, lastName, email, age, phone, password, googleId } =
    req.body;
  console.log({ firstName, lastName, email, age, phone, password, googleId });
  try {
    if (
      (checkValidString(firstName) &&
        checkValidEmail(email) &&
        checkValidPassword(password)) ||
      checkValidString(googleId)
    ) {
      const currentPassword = password || googleId;
      const hashedPassword = await bcrypt.hash(currentPassword, 10);
      const userFound = await User.findOne({
        email,
      });
      if (!userFound) {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          firstName,
          lastName,
          email,
          age,
          phone,
          password: hashedPassword,
        });

        await newUser.save();
        try {
          const accessToken = await loginUser({
            body: {
              email,
              password: currentPassword,
              newUser: true,
            },
          });
          res.send({
            error: false,
            message: successList.CREATE_USER,
            accessToken: accessToken,
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
