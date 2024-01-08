import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const patientService = {
  getPatientsTherapist: async (receiverId) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/patient/list/${receiverId}`
      );
      console.log("receiverId 1:", receiverId);
      console.log("response", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },

  unreadNotifications: async (patientId) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/patient/${patientId}`
      );
      console.log("receiverId 444:", patientId);
      console.log("response 444", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },

  statusChange: async (notificationId) => {
    console.log("receiverId notificationId:", notificationId);
    try {
      const response = await axios.put(
        `${REACT_APP_BASE_URL}/patient/change`, notificationId);
      console.log("notificationId:", notificationId);
      console.log("response notificationId", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },

  // getStatusChange: async (change) => {
  //   try {
  //     const response = await axios.get(
  //       `${REACT_APP_BASE_URL}/patient/change`,
  //       change
  //     );
  //     console.log("receiverId 1:", change);
  //     console.log("response", response);

  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching therapist patients:", error);
  //     throw new Error("Error fetching therapist patients");
  //   }
  // },
};
export default patientService;
