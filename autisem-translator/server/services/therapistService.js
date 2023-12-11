const therapistRepository = require('../repositories/therapistRepository');

async function therapistService(userName,firstName,lastName,phoneNumber, password,listOfPatients) {
  // Add validation or business logic as needed

  return therapistRepository.createTherapist(userName,firstName,lastName,phoneNumber, password,listOfPatients)
}

module.exports = therapistService

