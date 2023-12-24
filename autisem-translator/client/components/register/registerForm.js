import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, AccessibilityInfo, findNodeHandle } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import PasswordUpdateService from "../../services/backendServices/PasswordUpdateService";

// Assuming translationService is set up for multi-language support
// const translate = translationService.translate;

const styles = StyleSheet.create({
  container: {
    padding: 20, // Adequate padding for touch targets
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

const fields = [
  {
    name: "password",
    placeholder: "New Password", // Use translate("new password") for multi-language support
    type: "password",
    secureTextEntry: true,
    rules: validations.password,
    accessibilityLabel: "New Password Input",
    accessibilityHint: "Enter your new password",
  },
  {
    name: "repeatPassword",
    placeholder: "Verify Password", // Use translate("verify password") for multi-language support
    type: "password",
    secureTextEntry: true,
    rules: validations.repeatPassword,
    accessibilityLabel: "Verify Password Input",
    accessibilityHint: "Re-enter your new password for verification",
  },
];

export default function NewPassword({ route }) {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const errorRef = useRef(null);

  useEffect(() => {
    if (errorMessage && errorRef.current) {
      const tag = findNodeHandle(errorRef.current);
      AccessibilityInfo.setAccessibilityFocus(tag);
    }
  }, [errorMessage]);

  const onSubmit = async (data) => {
    try {
      const { userName } = route.params;
      const response = await PasswordUpdateService.updatePassword({
        userName: userName,
        newPassword: data.repeatPassword,
      });

      // Navigate or update UI upon successful password update
      // navigation.navigate("SuccessScreen"); // Example navigation

    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Error updating password. Please try again."); // Update error message
    }
  };

  return (
    <View style={styles.container} accessible>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Save"
        // Add any additional accessibility props to GenericForm if necessary
      />
      {errorMessage && (
        <Text 
          style={styles.errorText}
          ref={errorRef}
          accessible
          accessibilityLabel="Error Message"
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
