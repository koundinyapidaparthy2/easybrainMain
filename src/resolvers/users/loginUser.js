import { User } from "../../schemas/index.js";
import { errorList, successList } from "../../utils/Errors.js";
import { checkValidEmail, checkValidPassword } from "../../utils/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

async function resuedCodeForLoginUser({ email, password }) {
  const userDetails = await User.findOne({ email });
  console.log({ email, password });
  const userFound = await bcrypt.compare(password, userDetails.password);
  console.log({ userFound });
  if (userFound) {
    const accessToken = jwt.sign(
      { userId: userDetails._id, email: userDetails.email },
      process.env.AUTH_SECRET_TOKEN,
      {
        expiresIn: 3600,
      }
    );
    return accessToken;
  } else {
    throw new Error(errorList.USER_NOT_FOUND);
  }
}

const loginUser = async (req, res) => {
  const { email, password, newUser, fromFrontEnd, googleId } = req.body;
  try {
    if (checkValidEmail(email) && newUser) {
      return await resuedCodeForLoginUser({ email, password });
    } else if (
      (checkValidPassword(password) || googleId) &&
      checkValidEmail(email) &&
      fromFrontEnd
    ) {
      const accessToken = await resuedCodeForLoginUser({
        email,
        password: password || googleId,
      });
      res.send({
        error: false,
        message: successList.CREATE_USER,
        accessToken,
      });
    } else {
      throw new Error(errorList.USER_NOT_FOUND);
    }
  } catch (e) {
    console.log(e);
    if (res) {
      res.send({
        error: true,
        message: e.message || errorList.INTERNAL_ERROR,
        details: e,
      });
    } else {
      throw new Error(e.message || errorList.INTERNAL_ERROR);
    }
  }
};

export default loginUser;
