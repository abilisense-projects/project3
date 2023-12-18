import axios from "axios";
import { MMKV } from 'react-native-mmkv';
import { REACT_APP_BASE_URL } from '@env';

const storage = new MMKV();

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

  getTherapistDetails: async (userName) => {
    try {
      const storedToken = storage.getString('token');
      console.log("storedToken", storedToken);
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/therapists/get`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
        {
          params: {
            userName,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Get therapist details error:', error);
      throw error;
    }
  },
};

export default TherapistService;