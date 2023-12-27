import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../services/backendServices/userService";
import { translationService } from "../../services/translationService";

// Translation function alias for shorter usage
const translate = translationService.translate;

// StyleSheet for styling components
const styles = StyleSheet.create({
  errorText: {
    // color: "red",
    marginTop: 10,
  },
});

// Form fields configuration for new password entry
const fields = [
  {
    name: "password",
    placeholder: translate("new password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "repeatPassword",
    placeholder: translate("verify password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
  },
];

// Component function for handling password update
export default function NewPassword({ route }) {
  // Navigation hook for navigation functions
  const navigation = useNavigation();

  // State variable for displaying success message
  const [message, setMessage] = useState(null);

  // Form submission handler for updating the password
  const onSubmit = async (data) => {
    try {
      // Extract the userName from the route parameters
      const { userName } = route.params;
      console.log(userName);

      // Call the backend service to update the user's password
      const response = await UserService.updateUsersPassword({
        userName: userName.route.params.userName,
        newPassword: data.repeatPassword,
      });
      // Log relevant information for debugging
      console.log(userName.route.params.userName);
      console.log("Form Data:", data, route);
      console.log(response);
      console.log("response.Message", response.message);

      // Check the response from the server
      if (response.message === "Success update") {
        // Set a success message to be displayed
        setMessage("Password Changed!");
      }
    } catch (error) {
      // Log and handle errors, e.g., display an error message to the user
      console.error("Error updating password:", error);
    }
  };

  // Render the component
  return (
    <View accessible={true}>
      {/* GenericForm component for entering and verifying the new password */}
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={translate("save")}
      ></GenericForm>

      {/* Display success message if the password is updated successfully */}
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}
