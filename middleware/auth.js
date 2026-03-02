module.exports = (req, res, next) => {
  if (!req.session.admin) {
    return res.status(401).send("Unauthorized");
  }
  next();
};
