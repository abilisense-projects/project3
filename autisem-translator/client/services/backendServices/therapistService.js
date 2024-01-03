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

    sendNotificationToPatient: async (therapistId, patientUserName) => {
        try {
            console.log(therapistId, patientUserName);
    
            // Send the therapistId and patientUserName in the request body as an object
            const response = await axios.post(`${REACT_APP_BASE_URL}/therapist/sendNotification`, {
                therapistId: therapistId,
                patientUserName: patientUserName
            });
            // Check if the request was successful
            console.log("response notification", response.data);
        } catch (error) {
            console.error('Error sending notification:', error);
            throw new Error('Error sending notification');
        }
    }
    
};
export default therapistService;