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
    // name: "code",
    name: "Code",
    state: "code",
    placeholder: "Enter your code",
    type: "text",
    rules: validations.code,
  },
];

export default function CodeFromTheEmail() {
  const navigation = useNavigation();
  // const [errorMessage, setErrorMessage] = useState(null);

  // const handleFromEmail = async (data) => {
  //   try {
  //     console.log(data.Code);
  //     // Send the verification code to the server for validation
  //     const response = await CodeFromTheEmailService.createCodeFromEmail({
  //       code: data.Code,
  //     });
  //     // const response = await axios.post(
  //     //   "http://localhost:3000/sendEmailRouter/verifyCode",
  //     //   {
  //     //     code: formData.Code,
  //     //   }
  //     // );
  //     // Check the response from the server
  //     console.log(response);
  //     // console.log(formData);

  //     // navigation.navigate("NewPassword");

  //     // const responseData = response.data.trim(); // Extract data from the response

  //     // if (responseData === "Code is valid") {
  //     //   console.log("Code matches, proceed to the next function");
  //     //   // Navigate to the next screen (e.g., New Password)
  //     //   navigation.navigate("NewPassword");
  //     // } else if (responseData === "Invalid code") {
  //     //   console.log("Code does not match, display an error message");
  //     //   // setErrorMessage("Invalid code. Please try again.");
  //     // } else {
  //     //   // Handle other possible response scenarios if needed
  //     //   console.log("Unexpected response:", responseData);
  //     // }
  //   } catch (error) {
  //     console.error("Error verifying code:", error);
  //   }
  // };

  // const onSubmit = (data) => {
  //   // console.log("New Password:", data.password);
  //   // console.log("Repeat Password:", data.repeatPassword);
  //   navigation.navigate("NewPassword");
  // };

  const onSubmit = async (data) => {
    try {
      console.log(data.Code);
      // Send the verification code to the server for validation
      const response = await CodeFromTheEmailService.createCodeFromEmail({
        code: data.Code,
      });

      console.log(response);

      //Use Yup schema for validation directly
      // const validationResult = await validations.responseCode.validate(
      //   response,
      //   {
      //     abortEarly: false,
      //   }
      // );

      const validationResult = validations.responseCode.validate(response, {
        abortEarly: false,
      });

      if (validationResult === true) {
        // If the code is valid, navigate to NewPassword
        navigation.navigate("NewPassword");
      } else {
        // If the code is invalid, display the validation error message
        console.error("Invalid code:", validationResult);
      }

      // if (response === "Code is valid") {
      //   // If the code is valid, navigate to NewPassword
      //   navigation.navigate("NewPassword");
      // } else {
      //   // If the code is invalid, display the validation error message
      //   console.error("Invalid code:", response);
      // }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <View style={styles.modalContent}>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Next"
      ></GenericForm>

      {/* Display error message if it is set */}
      {/* {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>} */}
    </View>
  );
}
