const userRepository = require("../repositories/userRepository");
const userService={
async updateNew(userName, newPassword) {
  return userRepository.updateNew(userName, newPassword);
},

async updateNewImage(userName, image) {
  return userRepository.updateNewImage(userName, image);
},

async createUser(userName, firstName, lastName, phoneNumber, password, type) {
  return userRepository.createUser(userName, firstName, lastName, phoneNumber, password, type);
},

async getUser(userName) {
  return userRepository.getUser(userName);
},

async loginUser(userName, password) {
  try {
    const userExists = await userRepository.loginUser(userName, password);
    console.log("user service",userExists)
    return userExists;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking user login");
  }
},

async doesUserNameExist(userName) {
  try {
    const userNameExists = await userRepository.doesUserNameExist(userName);
    return userNameExists.exists;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking username existence");
  }
}


}
module.exports = userService
