import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";
const therapistService = {
    getTherapistPatients: async (therapistId) => {
        try {
            const response = await axios.get(`${REACT_APP_BASE_URL}/therapist/${therapistId}/patients`);
            return response.data;
        } catch (error) {
            console.error('Error fetching therapist patients:', error);
            throw new Error('Error fetching therapist patients');
        }
    },
};
export default therapistService;