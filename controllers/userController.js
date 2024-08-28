const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

async function getHomepage(req, res) {
  try {
    res.render("homepage");
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

module.exports = {
  getHomepage,
  getSignUpForm,
  postSignUpForm,
};
