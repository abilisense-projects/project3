import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GenericForm from "../shared/form";
import validations from "../shared/validations";
import { useNavigation } from "@react-navigation/native";

const fields = [
  {
    name: "Code",
    state: "code",
    placeholder: "Enter your code",
    type: "text",
    rules: validations.code,
  },
];

export default function CodeFromTheEmail({ route }) {
  const navigation = useNavigation();
  const { generatedCode } = route.params; // Get the passed parameter
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (formData) => {
    // Use the generated code as needed
    console.log(formData);
    if (formData.Code === generatedCode) {
      console.log("Code matches, proceed to the next function");
      //navigat to New Password
      navigation.navigate("New Password");
    } else {
      console.log("Code does not match, display an error message");
      setErrorMessage("Invalid code. Please try again.");

      // alert("Invalid code. Please try again.");
    }
    console.log(formData.Code === generatedCode);

    console.log("Form data:", formData);
  };

  const styles = StyleSheet.create({
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ccc", // Set your desired border color
      shadowColor: "#000", // Set your desired shadow color
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3, // This property adds an elevation effect on Android
    },
    errorMessage: {
      color: "red",
      marginTop: 10,
    },
  });
  return (
    <View style={styles.modalContent}>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Next"
      ></GenericForm>

      {/* Display error message if it is set */}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}
