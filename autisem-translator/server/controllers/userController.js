const userService = require("../services/userService");
const userUpdateService = require("../services/userUpdateService");

async function userLogin(req, res) {
  try {
    const { userName, password } = req.body;

    // Check if the required fields are provided
    if (!userName || !password) {
      return (
        res
          .status(200)
          //400
          .json({ message: "Username and password are required" })
      );
    }

    const userExists = await userService.checkUserExists(userName, password);

    if (userExists) {
      // User exists, you can continue or return true
      res.status(200).json({ message: "User exists" });
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

    const passwordUpdateResult = await userUpdateService.updateUserExists(
      userName
    );

    if (passwordUpdateResult) {
      const updateResult = await userUpdateService.updateUser(
        userName,
        newPassword
      );

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

module.exports = {
  userLogin,
  updatePassword,
};
