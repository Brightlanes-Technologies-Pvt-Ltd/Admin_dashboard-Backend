const express = require("express");
const {
  signUp,
  signIn,

  getAllStudents,
  changeRole,
  logOut,
} = require("../controllers/userController");
const { customRole } = require("../middlewares/customRoles");
const { isUserLoggedIn } = require("../middlewares/isUserLoggedIn");

const authRouter = express.Router();

authRouter.route("/signup").post(signUp);

authRouter.route("/signin").post(signIn);
authRouter.route("/logout").get(logOut);

// authRouter.route('/students').get(isUserLoggedIn, getAllStudents);

authRouter.route("/change-role").put(isUserLoggedIn, customRole, changeRole);

module.exports = authRouter;
