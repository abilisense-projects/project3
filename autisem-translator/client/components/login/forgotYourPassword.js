import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import SendTheEmailService from "../../services/backendServices/SendTheEmailService";
import { translationService } from "../../services/translationService";
const translate = translationService.translate;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

const fields = [
  {
    name: "userName",
    placeholder: translate("enter your email"),
    type: "text",
    rules: validations.email,
  },
];

export default function ForgotYourPassword() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // Send the email and verification code to the server
      console.log(data.userName);

      const response = await SendTheEmailService.createSendTheEmail({
        userName: data.userName,
      });

      // Check the response from the server
      console.log(response);
      if (response.message === "User exists") {
        setErrorMessage(null);
        navigation.navigate("CodeFromTheEmail", { userName: data.userName }); //send userName
        console.log("Email sent successfully!");
      } else {
        setErrorMessage("User does not exist.");
      }
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.data || error.toString()
      );
    } finally {
      // Set loading state to false after the validation is complete
      setIsLoading(false);
    }
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={
          isLoading ? translate("sending") : translate("reset password")
        }
        disabledButton={isLoading}
      ></GenericForm>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
}
