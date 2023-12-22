import axios from "axios"
import { REACT_APP_BASE_URL } from '@env';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
let storedToken = storage.getString('token');

const PatientService = {

  createPatient: async (patient) => {
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/user/register`, patient);
      const { token } = response.data;
      console.log("token", token);
      storage.set('token', token);
      return token;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },


  getPatientDetails: async () => {
    try {
      //take userNmae of redux
      const userName="pati@w.r"
      console.log("storedToken", storedToken);
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/user/profile`,
        {
          params: {
            userName,
          },
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log("response:",response)
      // Check for a new token in the response headers
      //why do you get here a new token?
      const newToken = response.headers['x-new-token'];
      //only if diffrent from old token
      if (newToken && newToken !== storedToken) {
        // Update the stored token with the new one
        storage.set('token', newToken);
        console.log("new token",storage.getString('token'))
      }
      return response.data;
    } catch (error) {
      console.log('Get therapist details error:', error);
      console.log(error.response.status)
      if (error.response && error.response.status === 403) {
        // Token is invalid or expired, navigate to the login screen
        console.log('Token invalid or expired. Redirecting to login screen.');
      }
      throw error;
    }
  },
}
export default PatientService;