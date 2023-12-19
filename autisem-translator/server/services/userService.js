const userRepository = require("../repositories/userRepository");

async function checkUserExists(userName, password) {
  return userRepository.createLogin(userName, password);
  //   return userRepository.putPassword(userName, password);
  //   try {
  //     const userExists = await userRepository.createLogin(userName, password);
  //     const passwordUpdateResult = await userRepository.putPassword(userName);
  //     if (userExists) {
  //       return {
  //         userExists,
  //       };
  //     } else if (passwordUpdateResult) {
  //       return {
  //         passwordUpdateResult,
  //       };
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Internal server error");
  //   }
}

module.exports = {
  checkUserExists,
};
