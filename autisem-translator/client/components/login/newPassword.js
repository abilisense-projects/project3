import React from "react";
import { View } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import PasswordUpdateService from "../../services/backendServices/PasswordUpdateService";
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

  const onSubmit = async (data) => {
    console.log("New Password:", data.password);
    console.log("Repeat Password:", data.repeatPassword);
    // navigation.navigate("Home");
    try {
      const response = await PasswordUpdateService.updatePassword(
        data
        // {password: data.repeatPassword,}
      );
      console.log(response);
      console.log("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Save"
      ></GenericForm>
    </View>
  );
}
