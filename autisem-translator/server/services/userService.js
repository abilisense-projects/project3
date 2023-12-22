const userRepository = require("../repositories/userRepository");
const userService={
async updateNew(userName, newPassword) {
  return userRepository.updateNew(userName, newPassword);
},

async createUser(userName, firstName, lastName, phoneNumber, password, type) {
  return userRepository.createUser(userName, firstName, lastName, phoneNumber, password, type);
},

async getUser(userName) {
  return userRepository.getUser(userName);
},

async checkUserExists(userName, password) {
  console.log("service",userName)
  return userRepository.checkUserNameExists(userName, password);
},

}
module.exports = userService
