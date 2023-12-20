import React from "react";
import { View } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { translationService } from "../../services/translationService";
const translate = translationService.translate;
const fields = [
  {
    name: "password",
    placeholder: translate('new password'),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "repeatPassword",
    placeholder:translate('verify password'),
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
    <View accessible={true}>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Save"
      ></GenericForm>
      {/* check function watch password */}
    </View>
  );
}
