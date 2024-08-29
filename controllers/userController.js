const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("../utils/passportConfig");

async function getHomepage(req, res) {
  try {
    res.render("homepage", { user: req.user });
  } catch (err) {
    console.error(err);
  }
}

async function getSignUpForm(req, res) {
  try {
    res.render("sign-up-form", {
      first_name: "",
      last_name: "",
      username: "",
      errors: [],
    });
  } catch (err) {
    console.error(err);
  }
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
    console.error(err);
    res.status(500).send("Server error.");
  }
}

async function getLoginForm(req, res) {
  try {
    res.render("login");
  } catch (err) {
    console.error(err);
  }
}

async function postLoginForm(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
}

module.exports = {
  getHomepage,
  getSignUpForm,
  postSignUpForm,
  getLoginForm,
  postLoginForm,
};
