import express from "express";
import createUser from "../resolvers/users/createUser.js";
import loginUser from "../resolvers/users/loginUser.js";
import deleteUser from "../resolvers/users/deleteUser.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Welcome");
});

router.route(`/createuser`).post(createUser);
router.route(`/loginuser`).post(loginUser);
router.route(`/deleteuser`).post(deleteUser);

export default router;
