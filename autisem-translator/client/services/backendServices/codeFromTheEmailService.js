import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const codeFromTheEmailService = {
  createCodeFromEmail: (codeFromEmail) =>
    axios
      .post(`${REACT_APP_BASE_URL}/sendEmailRouter/verifyCode`, codeFromEmail)
      .then((response) => response.data),
};
export default codeFromTheEmailService;
