const db = require("../db/queries");

const bcrypt = require("bcryptjs");

async function signupFormGet(req, res) {
  try {
    res.render("sign-up-form");
  } catch (err) {
    console.error(err);
  }
}

async function signupFormPost(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.inser;
  } catch (err) {
    console.error(err);
  }
}
