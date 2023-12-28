import React from "react";
import { View } from "react-native";
import RegistrationForm from "../components/register/registerForm";

export default function RegistrationScreen() {
  return (
    <View accessible={true}>
      <RegistrationForm></RegistrationForm>
    </View>
  );
}
