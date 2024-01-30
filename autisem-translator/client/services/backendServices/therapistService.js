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
      const response = await axios.post(`${REACT_APP_BASE_URL}/therapist/sendNotification`, {
        therapistId: therapistId,
        patientUserName: patientUserName
      });
      if (response.data.message == 'Patient not found') {
        return 'no such patient'
      }
      return null
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Error sending notification');
    }
  },

  unAssociatePatient: async (therapistId, patientId) => {
    try {
      const response = await axios.delete(`${REACT_APP_BASE_URL}/therapist?therapistID=${therapistId}&patientID=${patientId}`);
      if (response.data.success != true) {
        return 'failed'
      }
      else {
        return true
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Error sending notification');
    }
  },

  getPatientsDetailes: async (patientId) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/therapist/patients-details/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Error sending notification');
    }
  },

   createWord: async (patientID, translation) => {
    try {
      if (recordedData) {
        const response = await recordingService.uploadRecording('words/word', recordedData, patientID, translation);
        console.log('Recording uploaded to server', response);
      } else {
        console.warn('No recording data available.');
      }
    } catch (error) {
      console.error('Error uploading recording', error);
    }
  }

}


export default therapistService;
