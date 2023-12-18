import React from "react";
import { View } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
// import { translationService } from "../../services/translationService";
// const translate = translationService.translate;
const fields = [
  {
    name: "password",
    // placeholder: translate("new password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "repeatPassword",
    // placeholder: translate("verify password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
  },
];

export default function NewPassword() {
  const navigation = useNavigation();

  const onSubmit = (data) => {
    console.log("New Password:", data.password);
    console.log("Repeat Password:", data.repeatPassword);
    navigation.navigate("Home");
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
