import express from "express";
import createUser from "../reslovers/createUser.js";
const router = express.Router();
const BASICROUTEPATH = "/auth";
router.route("/").get((req, res) => {
  console.log(req.originalUrl);
  res.send("Welcome");
});
router.route(`/createuser`).post(createUser);

export default router;
