const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
