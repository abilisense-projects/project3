import React, { useState } from "react";
import { View, Text } from "react-native";
import GenericForm from "../shared/form";
import validations from "../shared/validations";

const fields = [
  {
    name: "Password",
    state: "password",
    placeholder: "Enter new Password",
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "RepeatPassword",
    state: "repeatPassword",
    placeholder: "Enter repeat Password",
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
  },
];

export default function NewPassword() {
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const onSubmit = (formData) => {
    // Check if passwords match
    if (formData.Password === formData.RepeatPassword) {
      // Passwords match, continue with your logic
      console.log("New Password:", formData.Password);
      console.log("Repeat Password:", formData.RepeatPassword);
      setPasswordsMatch(true);
      // Assuming you have a function to handle the submission, call it here
      // handleSubmission(formData);
      // Add your form submission logic here
      // `formData` contains the values of all form fields
    } else {
      // Passwords do not match, show an error message
      setPasswordsMatch(false);
      console.log("Passwords do not match!");
    }
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Save"
      ></GenericForm>
      {/* check function watch password */}

      {!passwordsMatch && (
        <Text style={{ color: "red" }}>Passwords do not match!</Text>
      )}
    </View>
  );
}
