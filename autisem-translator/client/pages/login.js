import React from "react";
import { View } from "react-native";
import Login from "../components/login/login";

export default function LoginScreen() {
  return (
    <View accessible={true}>
      <Login></Login>
    </View>
  );
}
