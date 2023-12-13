import axios from "axios"
const baseUrl = 'http://localhost:3000';

const PatientService = {
  createPatient: (patient) =>
   axios.post(`${baseUrl}/patients/register`, patient)
  .then(response => response.data),
}
export default PatientService;