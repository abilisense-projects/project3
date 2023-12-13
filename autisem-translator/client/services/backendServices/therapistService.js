import axios from "axios"
import { REACT_APP_BASE_URL } from '@env';

const TherapistService = {
  createTherapist: (therapist) => axios.post(`${REACT_APP_BASE_URL}/therapists/register`, therapist)
  .then(response => response.data),
}
export default TherapistService;