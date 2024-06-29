const jwt = require("jsonwebtoken");
require("dotenv").config();
const logoutlist = require("../logoutlist")

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("You are not allowed to create");
  }
  
  if (logoutlist.includes(token)) {
    return res.status(403).send("You are logout, please login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.body.userId = decoded.id;
    req.body.userEmail = decoded.email;
    req.body.userName = decoded.name;

    if (!decoded) {
      return res.status(401).send("Invalid token");
    }

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(401).send("You are not authenticated");
  }
};

module.exports = auth;
