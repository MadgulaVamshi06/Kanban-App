const express = require("express");
const userRouter = express.Router();


const{register , login, logout } = require("../controllers/user.controller")

userRouter.post("/register",register)

userRouter.post("/login", login)

userRouter.get("/logout", logout)

module.exports = userRouter;
