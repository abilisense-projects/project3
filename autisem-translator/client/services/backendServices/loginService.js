import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const LoginService = {
  createLogin: async (userLogin) => {
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/user/login`, userLogin);
      const { message, user } = response.data;
      if (message === "User exists") {
        // Handle the user details as needed
        console.log("User details:", user);
      }
      return response.data; // Return the entire response if needed
    } catch (error) {
      // Handle errors
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default LoginService;