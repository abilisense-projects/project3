import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
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
