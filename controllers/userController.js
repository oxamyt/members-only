const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("../utils/passportConfig");
require("dotenv").config();

async function handleError(
  res,
  err,
  statusCode = 500,
  message = "Server error."
) {
  console.error(err);
  res.status(statusCode).send(message);
}

async function getHomepage(req, res) {
  try {
    res.render("homepage", { user: req.user });
  } catch (err) {
    handleError(res, err);
  }
}

async function getSignUpForm(req, res) {
  res.render("sign-up-form", {
    first_name: "",
    last_name: "",
    username: "",
    errors: [],
  });
}

async function postSignUpForm(req, res) {
  const { first_name, last_name, username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up-form", {
      errors: errors.array(),
      first_name,
      last_name,
      username,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insertUser(first_name, last_name, username, hashedPassword);
    res.redirect("/");
  } catch (err) {
    handleError(res, err);
  }
}

async function getLoginForm(req, res) {
  res.render("login");
}

async function getLogout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
}

async function getMembershipForm(req, res) {
  res.render("update-membership", { errors: [] });
}

async function postMembershipForm(req, res) {
  const { passcode } = req.body;

  if (passcode !== process.env.SECRET_PASSCODE) {
    return res.status(400).render("update-membership", {
      errors: [{ msg: "Incorrect passcode." }],
    });
  }

  try {
    await db.updateMembershipStatus(req.user.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getHomepage,
  getSignUpForm,
  postSignUpForm,
  getLoginForm,
  getLogout,
  getMembershipForm,
  postMembershipForm,
};
