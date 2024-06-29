
const bcrypt = require("bcryptjs");
const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const logoutlist = require("../logoutlist")


exports.register =  async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "User already registered" });
      }
      bcrypt.hash(password, 1, async (err, hash) => {
        if (err) {
          return res.status(500).send("Error hashing password");
        }
        const user = new UserModel({
          username,
          email,
          password: hash,
          role
        });
        await user.save();
        res.status(200).send("User registered successfully");
      });
    } catch (error) {
      res.status(500).send("Internal error || error in registering user");
    }
  };


  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const olduser = await UserModel.findOne({ email });
      if (!olduser) {
        return res.status(404).send("User not found  && Please Register ");
      }
      const user = await UserModel.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).send("Error in comparing password");
          }
          if (result) {
            const token = jwt.sign(
              { email: user.email, name: user.username, id: user._id },
              process.env.JWT_SECRET
            );
            return res
              .status(200)
              .send({ message: "User logged in successfully", token: token });
            console.log(token);
          } else {
            return res.status(401).send("Invalid credentials");
          }
        });
      } else {
        return res.status(401).send("User not found");
      }
    } catch (error) {
      res.status(500).send("Internal server error || error in logging in");
    }
  };


  exports.logout = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("You have to login first");
    }
  
    if (!logoutlist.includes(token)) {
      logoutlist.push(token);
      console.log(`Token added to logoutlist: ${token}`);
    } else {
      console.log(`Token already in logoutlist: ${token}`);
    }
  
    res.status(200).send({ "message": "Logout successful" });
  };