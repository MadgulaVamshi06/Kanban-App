const checkRole = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Forbidden: Access Denied");
  }
};
module.exports = checkRole;


