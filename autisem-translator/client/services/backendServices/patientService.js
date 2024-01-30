import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const patientService = {
  getPatientsTherapist: async (receiverId) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/patient/list/${receiverId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },

  getlistOfAssociatedTherapist: async (receiverId) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/patient/ListOfAssociatedTherapists/${receiverId}`
      );
      console.log("receiverId 2:", receiverId);
      console.log("response 2", response);

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
      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },

  statusChange: async (notificationId) => {
    try {
      const response = await axios.put(
        `${REACT_APP_BASE_URL}/patient/change`,
        notificationId
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },

  statusChangeToConfirmed: async (associationsId) => {
    try {
      const response = await axios.put(
        `${REACT_APP_BASE_URL}/patient/changeAssociations`,
        associationsId
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },
  deletingTherapist: async (deleting) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_BASE_URL}/patient/deleteFromNotification`,
        // deleting
        { data: deleting }
      );
      const responseDelete = await axios.delete(
        `${REACT_APP_BASE_URL}/patient/deleteFromAssociations`,
        // deleting
        { data: deleting }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },
};
export default patientService;
