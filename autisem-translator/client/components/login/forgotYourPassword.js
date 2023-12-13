import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import axios from "axios";

const fields = [
  {
    name: "UserName",
    state: "username",
    placeholder: "Enter your email",
    type: "text",
    rules: validations.email,
  },
];

export default function ForgotYourPassword() {
  const navigation = useNavigation();

  const handleSendEmail = async (formData) => {
    try {
      // Send the email and verification code to the server
      console.log(formData.UserName);
      const response = await axios.post("http://localhost:3000/sendEmail", {
        to: formData.UserName,
      });
      navigation.navigate("CodeFromTheEmail");
      console.log("Email sent successfully!");
      // Alert.alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error.response.formData);
      // Alert.alert(
      //   "Failed to send email. Please check the console for details."
      // );
    }
  };

  const onSubmit = (formData) => {
    //send email
    handleSendEmail(formData);
    //clear form?
    //Handle form submission logic
    //save the data in db
    //did all data go through validations / wran user
    //save data / send to server
    console.log("Form data:", formData);
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Reset Password"
      ></GenericForm>
    </View>
  );
}
