import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import CodeFromTheEmailService from "../../services/backendServices/codeFromTheEmailService";
import { translationService } from "../../services/translationService";
const translate = translationService.translate;

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
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

const fields = [
  {
    name: "Code",
    state: "code",
    placeholder: translate("enter your code"),
    type: "text",
    rules: validations.code.client,
  },
];

export default function CodeFromTheEmail(userName) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [disableUntil, setDisableUntil] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const onSubmit = (data) => {
    HandleVerification(data);
  };

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

  const HandleVerification = async (data) => {
    try {
      console.log(data.Code);
      // Set loading state to true to indicate that the code is being verified
      setIsLoading(true);
      // Send the verification code to the server for validation
      const response = await CodeFromTheEmailService.createCodeFromEmail({
        code: data.Code,
      });
      console.log(response);

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

  const handleForgotPasswordPress = () => {
    navigation.navigate("ForgotYourPassword");
  };

  return (
    <View>
      {console.log("isButtonDisabled:", isButtonDisabled)}
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
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={{ color: "blue" }}>No email sent?</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {disableUntil > 0 && (
        <Text style={{ marginTop: 10 }}>
          Time remaining: {Math.floor(remainingTime / 60000)} minutes and{" "}
          {Math.ceil((remainingTime % 60000) / 1000)} seconds
        </Text>
      )}
    </View>
  );
}
