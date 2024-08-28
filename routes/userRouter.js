const { Router } = require("express");
const userController = require("../controllers/userController");
const { signupValidation } = require("./path/to/validation");
const { validate } = require("./path/to/validate");

const userRouter = Router();

userRouter.get("/", userController.homepageGet);

userRouter.get("/sign-up", userController.signupFormGet);

userRouter.post(
  "/sign-up",
  signupValidation,
  validate,
  userController.signupFormPost
);

module.exports = userRouter;
