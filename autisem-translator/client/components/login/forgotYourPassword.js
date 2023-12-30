import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import SendTheEmailService from "../../services/backendServices/sendTheEmailService";
import { translationService } from "../../services/translationService";

// Translation function alias for shorter usage
const translate = translationService.translate;

// StyleSheet for styling components
const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 40, // Adjust this value as needed
  },
});

// Form fields configuration
const fields = [
  {
    // name: "UserName"
    name: "userName",
    placeholder: translate("enter your email"),
    type: "text",
    rules: validations.email,
  },
];

// Component function for handling password reset request
export default function ForgotYourPassword() {
  // Navigation hook for navigation functions
  const navigation = useNavigation();

  // State variables for managing component state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Set loading state to true to indicate that the password reset request is in progress
      setIsLoading(true);

      console.log(data.userName);
      // Call the backend service to send the password reset email
      const response = await SendTheEmailService.createSendTheEmail({
        userName: data.userName,
      });

      // Check the response from the server
      console.log(response);
      if (response.message === "User exists") {
        // Clear error message if the user exists
        setErrorMessage(null);
        // Navigate to the "CodeFromTheEmail" screen, passing the userName as a parameter
        navigation.navigate("CodeFromTheEmail", { userName: data.userName }); //send userName
        console.log("Email sent successfully!");
      } else {
        // Set error message if the user does not exist
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

  // Render the component
  return (
    <View style={styles.modalContent}>
      {/* GenericForm component for entering email address for password reset */}
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={
          isLoading ? translate("sending") : translate("reset password")
        }
        disabledButton={isLoading}
      ></GenericForm>
      {/* Display error message if there is an error during the password reset request */}
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
}
