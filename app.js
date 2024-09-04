const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const userRouter = require("./routes/userRouter");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", userRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
