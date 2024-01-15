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
        `${REACT_APP_BASE_URL}/patient/change`,
        notificationId
      );
      console.log("notificationId:", notificationId);
      console.log("response notificationId", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },

  statusChangeToConfirmed: async (associationsId) => {
    console.log(" associationsId:", associationsId);
    try {
      const response = await axios.put(
        `${REACT_APP_BASE_URL}/patient/changeAssociations`,
        associationsId
      );
      console.log("associationsId:", associationsId);
      console.log("response associationsId", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },
  deletingTherapist: async (deleting) => {
    console.log("delete:", deleting);
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
      console.log("delete:", deleting);
      console.log("response 1", response);
      console.log("response 2", responseDelete);


      return response.data;
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
      throw new Error("Error fetching therapist patients");
    }
  },
};
export default patientService;
