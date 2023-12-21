import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const passwordUpdateService = {
  updatePassword: (update) =>
    axios
      .put(`${REACT_APP_BASE_URL}/user/updatePassword`, update)
      .then((response) => response.data),
};
export default passwordUpdateService;
