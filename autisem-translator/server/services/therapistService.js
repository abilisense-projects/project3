const therapistRepository = require('../repositories/therapistRepository');

async function therapistService(username,firstName,lastName,phoneNumber, password) {
  // Add validation or business logic as needed

  return therapistRepository.createTherapist(username,firstName,lastName,phoneNumber, password)
}

module.exports = therapistService

