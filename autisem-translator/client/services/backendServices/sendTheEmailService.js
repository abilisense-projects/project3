import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const sendTheEmailService = {
  createSendTheEmail: (sendTheEmail) =>
    axios
      .post(`${REACT_APP_BASE_URL}/sendEmail/`, sendTheEmail)
      .then((response) => response.data),
};
export default sendTheEmailService;
