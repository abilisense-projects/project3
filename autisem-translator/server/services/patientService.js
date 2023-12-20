const patientRepository = require('../repositories/patientRepository');

const patientService={
  async createPatient(userName,firstName,lastName,phoneNumber, password,listOfTherapists) {
  try {
    const createdPatient = await patientRepository.createPatient(userName,firstName,lastName,phoneNumber, password,listOfTherapists)
    return { success: true, patient: createdPatient };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to create therapist' };
  }
},
async getPatient(userName) {
  try {
    const fetchedPatient = await patientRepository.getPatient(userName)
    if (!fetchedPatient.success) {
      return { success: false, message: 'Failed to retrieve patient' };
    }
    return { success: true, therapist: fetchedPatient.patient };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal server error' };
  }
},
}
module.exports = patientService

