import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const patientService = {
  getPatientsTherapist: async (receiverId) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/patient/${receiverId}`
      );
      console.log("receiverId 1:", receiverId);
      console.log("response", response);

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
