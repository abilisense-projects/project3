import axios from "axios"
//const baseUrl = process.env.REACT_APP_API_KEY;
const baseUrl = 'http://localhost:3000';

const TherapistService = {
  createTherapist: (therapist) => axios.post(`${baseUrl}/therapists/register`, therapist)
  .then(response => response.data),
}
export default TherapistService;