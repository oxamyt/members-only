const { Router } = require("express");
const userController = require("../controllers/userController");
const { validate } = require("../utils/validate");
const { signupValidation } = require("../utils/validators");

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

module.exports = userRouter;
