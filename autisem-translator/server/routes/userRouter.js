const express = require("express");
const { userLogin, updatePassword } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/userLogin", userLogin);
userRouter.put("/updatePassword", updatePassword);

module.exports = userRouter;
