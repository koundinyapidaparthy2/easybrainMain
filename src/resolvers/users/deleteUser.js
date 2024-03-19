import { User } from "../../schemas/index.js";
import { errorList } from "../../utils/Errors.js";
import { checkValidEmail } from "../../utils/index.js";

const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    if (checkValidEmail(email)) {
      const userDetails = await User.findOne({ email });
      if (userDetails._id) {
        await User.deleteOne({ email, _id: userDetails._id });
        res.send({ accessToken: "", message: errorList.DELETE_USER });
      } else {
        throw new Error(errorList.USER_NOT_FOUND);
      }
    }
  } catch (e) {
    res.send({
      error: true,
      message: errorList.INTERNAL_ERROR,
      details: e,
    });
  }
};

export default deleteUser;
