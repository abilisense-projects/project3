const userRepository = require("../repositories/userRepository");

async function updateUserExists(userName) {
  return userRepository.updateNewPassword(userName);
}
async function updateUser(userName, newPassword) {
  return userRepository.updateNew(userName, newPassword);
}

module.exports = {
  updateUserExists,
  updateUser,
};
