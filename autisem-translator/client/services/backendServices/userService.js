import axios from "axios";
import { MMKV } from "react-native-mmkv";
import { REACT_APP_BASE_URL } from "@env";

const storage = new MMKV();
let storedToken = storage.getString("token");

const UserService = {
  createUser: async (user) => {
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/user/register`,
        user
      );
      const { token, userId } = response.data;
      storage.set("token", token);
      return userId;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log("Username conflict. Throwing an error.");
        throw new Error("Username conflict");
      } else {
        // For other errors, log and rethrow
        console.error("Registration error:", error);
        throw error;
      }
    }
  },

  getUserDetails: async () => {
    try {
      //take userName of redux
      const userName = "piki@example.com";
      console.log("storedToken", storedToken);
      const response = await axios.get(`${REACT_APP_BASE_URL}/user/profile`, {
        params: {
          userName,
        },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log("response:", response);
      // Check for a new token in the response headers
      const newToken = response.headers["x-new-token"];
      //only if diffrent from old token
      if (newToken && newToken !== storedToken) {
        console.log("new token", newToken);
        storage.set("token", newToken);
        storedToken = storage.getString("token");
        console.log("storedTokennnnnnnn", storedToken);
      }
      return response.data;
    } catch (error) {
      console.log("Get therapist details error:", error);
      console.log(error.response.status);
      if (error.response && error.response.status === 403) {
        // Token is invalid or expired, navigate to the login screen
        console.log("Token invalid or expired. Redirecting to login screen.");
        // You may use navigation functions or state management to handle redirection
        // to the login screen in your React Native application.
        // navigation.navigate("Login");
      }
      throw error;
    }
  },

  updateUsersPassword: (update) =>
    axios
      .put(`${REACT_APP_BASE_URL}/user/updatePassword`, update)
      .then((response) => response.data),

  loginUser: async (userLogin) => {
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/user/login`,
        userLogin
      );
      return response.data; // Return the entire response if needed
    } catch (error) {
      // Handle errors
      console.error("Login error:", error);
      throw error;
    }
  },

//   updateImage: async (image) => {
//     try {
//       const response = await axios.post(
//         `${REACT_APP_BASE_URL}/user/updateImage`,
//         image
//       );
//       return response.data; // Return the entire response if needed
//     } catch (error) {
//       // Handle errors
//       console.error("Login error:", error);
//       throw error;
//     }
//   },
};

export default UserService;
