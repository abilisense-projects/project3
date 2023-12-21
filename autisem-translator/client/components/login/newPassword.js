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

export default function NewPassword({ route }) {
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    try {
      const { userName } = route.params;
      console.log(userName);

      const response = await PasswordUpdateService.updatePassword({
        userName: userName.route.params.userName,
        newPassword: data.repeatPassword,
      });
      console.log(userName.route.params.userName);
      console.log("Form Data:", data, route);

      console.log(response);
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
