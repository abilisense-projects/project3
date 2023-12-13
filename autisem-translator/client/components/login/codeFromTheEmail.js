import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const fields = [
  {
    name: "Code",
    state: "code",
    placeholder: "Enter your code",
    type: "text",
    rules: validations.code,
  },
];

export default function CodeFromTheEmail() {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (formData) => {
    try {
      // Send the verification code to the server for validation
      const response = await axios.post("http://localhost:3000/verifyCode", {
        code: formData.Code,
      });
      // Check the response from the server
      console.log(response);
      if (response.data === "Code is valid") {
        console.log("Code matches, proceed to the next function");
        // Navigate to the next screen (e.g., New Password)
        navigation.navigate("NewPassword");
      } else {
        console.log("Code does not match, display an error message");
        setErrorMessage("Invalid code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error.response.formData);
      // Alert.alert(
      //   "Failed to verify code. Please check the console for details."
      // );
    }
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
    // errorMessage: {
    //   color: "red",
    //   marginTop: 10,
    // },
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
