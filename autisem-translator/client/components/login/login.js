import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { translationService } from "../../services/translationService";
import UserService from "../../services/backendServices/userService";

// Translation function alias for shorter usage
const translate = translationService.translate;

// StyleSheet for styling components
const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

// Form fields configuration
const fields = [
  {
    name: "userName",
    placeholder: translate("email"),
    type: "text",
    rules: validations.email,
  },
  {
    name: "password",
    placeholder: translate("password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "forgotPassword",
    type: "link",
    onPress: (navigation) => navigation.navigate("ForgotYourPassword"),
    text: translate("forgot your password"),
  },
];

// Component function for handling user login
export default function Login() {
  // Navigation hook for navigation functions
  const navigation = useNavigation();

  // State variables for managing component state
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [rememberMe, setRememberMe] = useState(false);

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      // Set loading state to true to indicate that the login is in progress
      setIsLoading(true);

      // Send login request to the server
      const response = await UserService.loginUser(data);
      console.log("Response object:", response);

      if (response.message === "User exists") {
        // Clear error message if the user exists
        setErrorMessage(null);
      } else {
        // Set error message if the login credentials are incorrect
        setErrorMessage("The email or password is incorrect, try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading state to false after the validation is complete
      setIsLoading(false);
    }
  };

  // Render the component
  return (
    <View>
      {/* GenericForm component for entering login credentials */}
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        // submitButton={translate("login")}
        navigation={navigation}
        submitButton={isLoading ? "Verifying..." : "login"}
        disabledButton={isLoading}
      ></GenericForm>

      {/* Display error message if there is an error during login */}
      <Text style={styles.errorText}>{errorMessage}</Text>

      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>{translate('remember me')}</Text>
      </View> */}
    </View>
  );
}
