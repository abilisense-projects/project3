import axios from "axios";
import { MMKV } from 'react-native-mmkv';
import { REACT_APP_BASE_URL } from '@env';

const storage = new MMKV();
let storedToken = storage.getString('token');

const TherapistService = {
  createTherapist: async (therapist) => {
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/therapists/register`, therapist);
      const { token } = response.data;
      console.log("token", token);
      storage.set('token', token);
      return token;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  getTherapistDetails: async () => {
    try {
      //take userNmae of redux
      const userName="thera@r.t"
      console.log("storedToken", storedToken);
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/therapists/get`,
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
      const newToken = response.headers['x-new-token'];
     // console.log("new token",newToken)
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
        // You may use navigation functions or state management to handle redirection
        // to the login screen in your React Native application.
        // navigation.navigate("Login");
      }
      throw error;
    }
  },

  checkUserNameExists: async (userName) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/therapists/register`,
        {
          params: {
            userName,
          },
          //do i need auth?
          //is it enough safe?
        }
      );
      return response.data.exists;
    } catch (error) {
      console.error('Check username error:', error);
      throw error;
    }
  },

};

export default TherapistService;