const { Router } = require("express");
const userController = require("../controllers/userController");
const { validate } = require("../utils/validate");
const { signupValidation } = require("../utils/validators");
const passport = require("../utils/passportConfig");
const checkAuthenticated = require("../utils/checkAuthenticated");
const checkAdmin = require("../utils/checkAdmin");

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

userRouter.get(
  "/new-message",
  checkAuthenticated,
  userController.getNewMessageForm
);

userRouter.post(
  "/new-message",
  checkAuthenticated,
  userController.postNewMessageForm
);

userRouter.post(
  "/:id/delete",
  checkAuthenticated,
  checkAdmin,
  userController.postDeleteMessage
);

userRouter.get(
  "/update-admin",
  checkAuthenticated,
  userController.getAdminStatus
);

userRouter.post(
  "/update-admin",
  checkAuthenticated,
  userController.postAdminStatus
);

module.exports = userRouter;
