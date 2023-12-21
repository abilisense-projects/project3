import React from "react";
import { View } from "react-native";
import ForgotYourPassword from "../components/login/forgotYourPassword";

export default function ForgotPassword() {
  return (
    <View accessible={true}> 
      <ForgotYourPassword></ForgotYourPassword>
    </View>
  );
}
