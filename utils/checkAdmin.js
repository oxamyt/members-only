function checkAdmin(req, res, next) {
  if (req.user.is_admin) {
    return next();
  } else {
    return res.status(403).send("You have to be admin to perform this action.");
  }
}

module.exports = checkAdmin;
