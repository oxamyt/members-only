const { Router } = require("express");
const userController = require("../controllers/userController");
const { validate } = require("../utils/validate");
const { signupValidation } = require("../utils/validators");
const passport = require("../utils/passportConfig");
const checkAuthenticated = require("../utils/checkAuthenticated");

const userRouter = Router();

userRouter.get("/", userController.getHomepage);

userRouter.get("/sign-up", userController.getSignUpForm);

userRouter.post(
  "/sign-up",
  signupValidation,
  validate,
  userController.postSignUpForm
);

userRouter.get("/login", userController.getLoginForm);

userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

userRouter.get("/logout", userController.getLogout);

userRouter.get(
  "/update-membership",
  checkAuthenticated,
  userController.getMembershipForm
);

userRouter.post(
  "/update-membership",
  checkAuthenticated,
  userController.postMembershipForm
);

module.exports = userRouter;
