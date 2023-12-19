import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const LoginService = {
  createLogin: (userLogin) =>
    axios
      .post(`${REACT_APP_BASE_URL}/user/userLogin`, userLogin)
      .then((response) => response.data),
};
export default LoginService;
