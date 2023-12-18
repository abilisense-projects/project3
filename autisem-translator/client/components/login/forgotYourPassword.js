import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import SendTheEmailService from "../../services/backendServices/sendTheEmailService";

// import { translationService } from "../../services/translationService";

// const translate = translationService.translate;
const fields = [
  {
    // name: "UserName",
    name: "userName",
    // placeholder: translate("email"),
    placeholder: "Enter your email",
    type: "text",
    rules: validations.email,
  },
];

export default function ForgotYourPassword() {
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    try {
      // Send the email and verification code to the server
      console.log(data.userName);

      const response = await SendTheEmailService.createSendTheEmail({
        to: data.userName,
      });
      // const response = await axios.post(
      // "http://localhost:3000/sendEmailRouter/sendEmail",
      // {
      //   to: formData.UserName,
      // }
      // Check the response from the server
      console.log(response);
      navigation.navigate("CodeFromTheEmail");
      console.log("Email sent successfully!");
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.data || error.toString()
      );
    }
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Reset Password"
      ></GenericForm>
      {/* <GenericForm fields={fields} onSubmit={onSubmit} submitButton={translate('reset password')}></GenericForm> */}
    </View>
  );
}
