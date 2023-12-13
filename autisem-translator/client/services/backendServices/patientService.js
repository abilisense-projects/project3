import axios from "axios"
import { REACT_APP_BASE_URL } from '@env';

const PatientService = {
  createPatient: (patient) =>
   axios.post(`${REACT_APP_BASE_URL}/patients/register`, patient)
  .then(response => response.data),
}
export default PatientService;