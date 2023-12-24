import React, { useState } from "react";
import { View, Text, StyleSheet, AccessibilityInfo, findNodeHandle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import SendTheEmailService from "../../services/backendServices/sendTheEmailService";

// Assuming GenericForm and its fields are already designed with accessibility in mind

const styles = StyleSheet.create({
  formContainer: {
    // Ensure adequate padding and spacing for touch targets
    padding: 20,
  },
  loadingText: {
    marginTop: 10, // Maintain touch target size
  },
});

const fields = [
  {
    name: "userName",
    placeholder: "Enter your email", // Consider using translationService for multi-language support
    type: "text",
    rules: validations.email,
    accessibilityLabel: "Email Input", // Descriptive label for screen readers
    accessibilityHint: "Enter the email associated with your account", // Additional context for screen readers
  },
];

export default function ForgotYourPassword() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = React.useRef(null);

  React.useEffect(() => {
    // Focus on the loading text for screen readers when loading starts
    if (isLoading && loadingRef.current) {
      const tag = findNodeHandle(loadingRef.current);
      AccessibilityInfo.setAccessibilityFocus(tag);
    }
  }, [isLoading]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log(data.userName);

      const response = await SendTheEmailService.createSendTheEmail({
        to: data.userName,
      });

      console.log(response);
      navigation.navigate("CodeFromTheEmail", { userName: data.userName });
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error.response?.data || error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={isLoading ? "Sending..." : "Reset Password"}
        disabled={isLoading}
      />
      {isLoading && (
        <Text
          style={styles.loadingText}
          ref={loadingRef}
          accessible
          accessibilityLabel="Sending email"
        >
          Sending...
        </Text>
      )}
    </View>
  );
}
