import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import sendTheEmailService from "../../services/backendServices/sendTheEmailService";

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
});

const fields = [
  {
    name: "Code",
    state: "code",
    placeholder: "Enter your code",
    type: "text",
    rules: validations.code.client,
  },
];

export default function CodeFromTheEmail(userName) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    Handle(data);
  };

  const Handle = async (data) => {
    try {
      console.log(data.Code);
      // Set loading state to true to indicate that the code is being verified
      setIsLoading(true);
      // Send the verification code to the server for validation
      const response = await sendTheEmailService.createCodeFromEmail({
        code: data.Code,
      });

      console.log(response);
      const validationResult = validations.code.server.validate(response);
      console.log(validationResult);
      if (validationResult !== true) {
        // Set the error state with the validation message
        setError(validationResult);
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

  return (
    <View style={styles.modalContent}>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={isLoading ? "Verifying..." : "Next"}
        disabled={isLoading}
      ></GenericForm>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
