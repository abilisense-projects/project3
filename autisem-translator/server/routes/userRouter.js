const express = require("express");
const { userLogin, updatePassword, createUser, getUserDetailes } = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authentication");

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.put("/updatePassword", updatePassword);
userRouter.post("/register", createUser);
userRouter.get("/profile", authenticateJWT,getUserDetailes);

module.exports = userRouter;