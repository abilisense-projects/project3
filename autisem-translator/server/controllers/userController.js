const userService = require("../services/userService");

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

    // const { userExists } = await userService(userName, password);

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

// async function updatePassword(req, res) {
//   try {
//     const { userName } = req.body;

//     // Check if the required fields are provided
//     if (!userName) {
//       return (
//         res
//           .status(200)
//           //400
//           .json({ message: "Username are required" })
//       );
//     }

//     const { passwordUpdateResult } = await userService(userName);

//     if (passwordUpdateResult) {
//       // User exists, you can continue or return true
//       res.status(200).json({ message: "User exists" });
//     } else {
//       // User does not exist, return a message to register
//       res
//         .status(200)
//         //404
//         .json({ message: "User does not exist. Please register." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

module.exports = {
  userLogin,
  //   updatePassword,
};
