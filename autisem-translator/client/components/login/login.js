import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, AccessibilityInfo, findNodeHandle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { translationService } from "../../services/translationService";
import LoginService from "../../services/backendServices/loginService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userAction";

const translate = translationService.translate;

const styles = StyleSheet.create({
  container: {
    padding: 20, // Providing padding for better touch targets
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  loadingText: {
    marginTop: 10, // Maintain touch target size
  },
});

const fields = [
  {
    name: "userName",
    placeholder: translate("email"),
    type: "text",
    rules: validations.email,
    accessibilityLabel: translate("Email Input"), // Accessibility label
    accessibilityHint: translate("Enter your email address"), // Accessibility hint
  },
  {
    name: "password",
    placeholder: translate("password"),
    type: "password",
    secureTextEntry: true,
    rules: validations.password,
    accessibilityLabel: translate("Password Input"),
    accessibilityHint: translate("Enter your password"),
  },
  {
    name: "forgotPassword",
    type: "link",
    onPress: (navigation) => navigation.navigate("ForgotYourPassword"),
    text: translate("forgot your password"),
    accessibilityLabel: translate("Forgot Password Link"),
    accessibilityHint: translate("Navigates to password recovery screen"),
  },
];

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const errorRef = useRef(null);

  // useEffect(() => {
  //   if (errorMessage && errorRef.current) {
  //     const tag = findNodeHandle(errorRef.current);
  //     AccessibilityInfo.setAccessibilityFocus(tag);
  //   }
  // }, [errorMessage]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await LoginService.createLogin(data);
      if (response.message === "User exists") {
        setErrorMessage(null);
      } else {
        setErrorMessage(translate("The email or password is incorrect, try again."));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
    dispatch(setUser(data)); // Temporary until login request is finalized
  };

  return (
    <View style={styles.container}>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        navigation={navigation}
        submitButton={isLoading ? translate("Verifying...") : translate("login")}
        disabled={isLoading}
      />
      {errorMessage && (
        <Text 
          style={styles.errorText}
          ref={errorRef}
          accessible
          accessibilityLabel={translate("Error Message")}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
