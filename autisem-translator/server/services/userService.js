const userRepository = require("../repositories/userRepository");

async function checkUserExists(userName, password) {
  return userRepository.createLogin(userName, password);
}

module.exports = {
  checkUserExists,
};
