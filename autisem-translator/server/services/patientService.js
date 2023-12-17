const patientRepository = require('../repositories/patientRepository');

async function patientService(userName,firstName,lastName,phoneNumber, password,listOfPatients) {
  // Add validation or business logic as needed

  return patientRepository.createPatient(userName,firstName,lastName,phoneNumber, password,listOfPatients)
}

module.exports = patientService

