import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import sendTheEmailService from "../../services/backendServices/sendTheEmailService";
import { translationService } from "../../services/translationService";

// Translation function alias for shorter usage
const translate = translationService.translate;

// StyleSheet for styling components
const styles = StyleSheet.create({
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
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

// Form fields configuration
const fields = [
  {
    name: "Code",
    state: "code",
    placeholder: translate("enter your code"),
    type: "text",
    rules: validations.code.client,
  },
];

// Component function to handle verification code from email
export default function CodeFromTheEmail(userName) {
  // Navigation hook for navigation functions
  const navigation = useNavigation();

  // State variables for managing component state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State variables for handling button disablement and timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [disableUntil, setDisableUntil] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  // Form submission handler
  const onSubmit = (data) => {
    HandleVerification(data);
  };

  // Effect hook for managing button disablement and timer updates
  useEffect(() => {
    if (disableUntil > 0) {
      setIsButtonDisabled(true);

      // Calculate the remaining time until the button is enabled
      const remainingTime = disableUntil - new Date().getTime();
      setRemainingTime(remainingTime);

      // Set a timeout to update the remaining time
      const timeoutId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);

      // Set a timeout to enable the button when the timer expires
      const enableTimeoutId = setTimeout(() => {
        setIsButtonDisabled(false);
        setDisableUntil(0);
        clearInterval(timeoutId); // Clear the countdown interval
      }, remainingTime);

      // Clear the timeout when the component is unmounted
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(enableTimeoutId);
      };
    }
  }, [disableUntil]);

  // Verification code handling function
  const HandleVerification = async (data) => {
    try {
      console.log(data.Code);
      // Set loading state to true to indicate that the code is being verified
      setIsLoading(true);

      // Send the verification code to the server for validation
      const response = await sendTheEmailService.createCodeFromEmail({
        code: data.Code,
      });
      console.log(response);

      // Validate the server response
      const validationResult = validations.code.server.validate(response);
      console.log(validationResult);

      if (validationResult !== true) {
        // Set the error state with the validation message
        setError(validationResult);

        if (response.disableUntil) {
          // Update the state to disable the button and set the disableUntil time
          setDisableUntil(response.disableUntil);
        }
      } else {
        // Reset the error state if the validation passes
        setError(null);
        // Code is valid, navigate to the next screen
        navigation.navigate("NewPassword", { userName });
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    } finally {
      // Set loading state to false after the validation is complete
      setIsLoading(false);
    }
  };

  // Navigation function for handling "Forgot Password" press
  const handleForgotPasswordPress = () => {
    navigation.navigate("ForgotYourPassword");
  };

  // Render the component
  return (
    <View style={styles.modalContent}>
      {console.log("isButtonDisabled:", isButtonDisabled)}

      {/* GenericForm component for entering verification code */}
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={
          disableUntil
            ? translate("try later")
            : isLoading
            ? translate("verifying")
            : translate("next")
        }
        disabledButton={isLoading || isButtonDisabled}
      ></GenericForm>

      {/* Link to navigate to the "Forgot Password" screen */}
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={{ color: "blue" }}>No email sent?</Text>
      </TouchableOpacity>

      {/* Display error message if there is an error */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Display remaining time if the button is disabled */}
      {disableUntil > 0 && (
        <Text style={{ marginTop: 10 }}>
          Time remaining: {Math.floor(remainingTime / 60000)} minutes and{" "}
          {Math.ceil((remainingTime % 60000) / 1000)} seconds
        </Text>
      )}
    </View>
  );
}
