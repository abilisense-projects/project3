import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import axios from "axios";
import { translationService } from "../../services/translationService";

const translate = translationService.translate;
const fields = [
  {
    name: "userName",
    placeholder: translate("email"),
    type: "text",
    rules: validations.email,
  },
];

export default function ForgotYourPassword() {
  const navigation = useNavigation();

  const onSubmit = async (formData) => {
    try {
      // Send the email and verification code to the server
      console.log(formData.UserName);
      const response = await axios.post(
        "http://localhost:3000/sendEmailRouter/sendEmail",
        {
          to: formData.UserName,
        }
      );
      // Check the response from the server
      console.log(response);
      navigation.navigate("CodeFromTheEmail");
      console.log("Email sent successfully!");
      // Alert.alert("Email sent successfully!");
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.formData || error.toString()
      );
      // Alert.alert(
      //   "Failed to send email. Please check the console for details."
      // );
    }
  };

  // const onSubmit = (formData) => {
  //   //send email
  //   handleSendEmail(formData);
  //   //clear form?
  //   //Handle form submission logic
  //   //save the data in db
  //   //did all data go through validations / wran user
  //   //save data / send to server
  //   console.log("Form data:", formData);
  // };

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
