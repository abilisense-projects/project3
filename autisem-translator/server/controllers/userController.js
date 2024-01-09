const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
require("dotenv").config();
const { SECRET_KEY } = process.env;

async function userLogin(req, res) {
  try {
    const { userName, password } = req.body;
    // Check if the required fields are provided
    //i think you can remove this because we have validation on client side
    if (!userName || !password) {
      return res
        .status(200)
        .json({ message: "Username and password are required" });
    }

    const user = await userService.loginUser(userName, password);
    if (user) {
      // User exists, return the user details
      res.status(200).json({ message: "User exists", user });
    } else {
      // User does not exist, return a message to register
      res
        .status(200)
        .json({ message: "User does not exist. Please register." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//can it be more generic
async function updatePassword(req, res) {
  try {
    const { userName, newPassword } = req.body;
    console.log(userName, newPassword);

    //  Check if the required fields are provided
    if (!userName || !newPassword) {
      return (
        res
          .status(200)
          //400
          .json({ message: "Username and newPassword are required" })
      );
    }

    const passwordUpdateResult = await userService.doesUserNameExist(userName);
    console.log("passwordUpdateResult", passwordUpdateResult);
    if (passwordUpdateResult) {
      const updateResult = await userService.updateNew(userName, newPassword);

      // Check the specific condition based on the result of updateUser
      if (updateResult) {
        res.status(200).json({ message: "Success update" });
      } else {
        res
          .status(200)
          //500
          .json({ message: "Failed to update password" });
      }
    } else {
      // User does not exist, return a message to register
      res
        .status(200)
        //404
        .json({ message: "User does not exist. Please register." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createUser(req, res) {
  try {
    const { userName, firstName, lastName, phoneNumber, password, type } =
      req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the username already exists
    const userNameExists = await userService.doesUserNameExist(userName);
    if (userNameExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const createUserResult = await userService.createUser(
      userName,
      firstName,
      lastName,
      phoneNumber,
      hashedPassword, // Store the hashed password
      // password,
      type
    );
    const { userId } = createUserResult;
    //after 1 hour refresh for another hour
    const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: "2m" });
    res
      .status(201)
      .json({ message: "User registered successfully", userId, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserDetailes(req, res) {
  try {
    //after middleware the data is in user
    const decodedToken = req.user;
    const { userName } = decodedToken;
    const userDetails = await userService.getUser(userName);
    res
      .status(200)
      .json({ message: "Users details retrieved successfully", userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateImage(req, res) {
  try {
    const { userName, image } = req.body;
    console.log("userName:", userName, "image", image);
    //  Check if the required fields are provided
    if (!userName) {
      return (
        res
          .status(200)
          //400
          .json({ message: "Username and newPassword are required" })
      );
    }
    const imageUpdateResult = await userService.doesUserNameExist(userName);
    if (imageUpdateResult) {
      const updateResult = await userService.updateNewImage(userName, image);
      // Check the specific condition based on the result of updateUser
      if (updateResult) {
        res.status(200).json({ message: "Success update" });
      } else {
        res
          .status(200)
          //500
          .json({ message: "Failed to update image" });
      }
    } else {
      // User does not exist, return a message to register
      res
        .status(200)
        //404
        .json({ message: "User does not exist. Please register." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  userLogin,
  updatePassword,
  createUser,
  getUserDetailes,
  updateImage,
};
