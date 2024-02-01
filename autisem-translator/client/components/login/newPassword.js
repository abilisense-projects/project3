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

// Form fields configuration for new password entry
const fields = [
  {
    name: "password",
    placeholder: translate("new password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
    accesabilityLabel: "password input",
    accesabilityHint: "enter your password",
  },
  {
    name: "repeatPassword",
    placeholder: translate("verify password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
    accesabilityLabel: "password verification input",
    accesabilityHint: "verify your password",
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
      // Call the backend service to update the user's password
      const response = await UserService.updateUsersPassword({
        userName: userName.route.params.userName,
        newPassword: data.repeatPassword,
      });
      // Check the response from the server
      if (response.message === "Success update") {
        // Set a success message to be displayed
        navigation.navigate("Login");
      } else {
        setMessage("Update password failed");
      }
    } catch (error) {
      // Log and handle errors, e.g., display an error message to the user
      console.error("Error updating password:", error);
    }
  };

  // Render the component
  return (
    <View style={styles.modalContent} accessible accesabilityLabel='new password screen'>
      {/* GenericForm component for entering and verifying the new password */}
      <GenericForm
        accessible={true}
        accesabilityLabel="new password screen"
        fields={fields}
        onSubmit={onSubmit}
        submitButton={translate("save")}
      ></GenericForm>

      {/* Display success message if the password is updated successfully */}
      <Text style={styles.errorText} accessible accessibilityLabel="reset password">{message}</Text>
    </View>
  );
}
