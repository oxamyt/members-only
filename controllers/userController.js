const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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
    const messages = await db.getMessages();
    res.render("homepage", { user: req.user, messages: messages });
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
    handleError(res, err);
  }
}

async function getNewMessageForm(req, res) {
  res.render("new-message-form");
}

async function postNewMessageForm(req, res) {
  const { title, text } = req.body;

  try {
    const timestamp = new Date();
    await db.insertNewMessage(title, text, req.user.id, timestamp);
    res.redirect("/");
  } catch (err) {
    handleError(res, err);
  }
}

async function postDeleteMessage(req, res) {
  const id = req.params.id;

  try {
    await db.deleteMessageById(id);
    res.redirect("/");
  } catch (err) {
    handleError(res, err);
  }
}

async function getAdminStatus(req, res) {
  res.render("update-admin", { errors: [] });
}

async function postAdminStatus(req, res) {
  const { passcode } = req.body;

  if (passcode !== process.env.SECRET_ADMIN_PASSCODE) {
    return res.status(400).render("update-admin", {
      errors: [{ msg: "Incorrect passcode." }],
    });
  }

  try {
    await db.updateAdminStatus(req.user.id);
    res.redirect("/");
  } catch (err) {
    handleError(res, err);
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
  getNewMessageForm,
  postNewMessageForm,
  postDeleteMessage,
  getAdminStatus,
  postAdminStatus,
};
