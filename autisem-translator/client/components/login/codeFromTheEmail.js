import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, AccessibilityInfo, findNodeHandle } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import CodeFromTheEmailService from "../../services/backendServices/codeFromTheEmailService";

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
    color: 'red',
    marginTop: 10, // Ensure touch target size for error messages if they are interactive
  },
});

const fields = [
  {
    name: "Code",
    state: "code",
    placeholder: "Enter your code",
    type: "text",
    rules: validations.code.client,
    accessibilityLabel: "Verification Code Input", // Accessibility label for the input field
    accessibilityHint: "Enter the code you received in your email", // Hint for screen readers
  },
];

export default function CodeFromTheEmail(userName) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const errorRef = useRef(null);

  useEffect(() => {
    // When error is set, focus the screen reader on the error message
    if (error && errorRef.current) {
      const tag = findNodeHandle(errorRef.current);
      AccessibilityInfo.setAccessibilityFocus(tag);
    }
  }, [error]);

  const onSubmit = (data) => {
    Handle(data);
  };

  // ... Existing Handle function ...

  return (
    <View style={styles.modalContent} accessible accessibilityLabel="Verification Code Screen">
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={isLoading ? "Verifying..." : "Next"}
        disabled={isLoading}
        // Add accessibility properties if needed
      ></GenericForm>
      {error && (
        <Text 
          style={styles.errorText}
          ref={errorRef} // Reference for managing focus
          accessible
          accessibilityLabel={`Error: ${error}`}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
