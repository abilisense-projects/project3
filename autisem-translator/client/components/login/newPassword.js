import React from "react";
import { View } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";

const fields = [
  {
    name: "password",
    placeholder: "Enter new Password",
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "repeatPassword",
    placeholder: "Enter repeat Password",
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
  },
];

export default function NewPassword() {

  const onSubmit = (formData) => {
       console.log("New Password:", formData.Password);
       console.log("Repeat Password:", formData.RepeatPassword);
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Save"
      ></GenericForm>
      {/* check function watch password */}
    </View>
  );
}
