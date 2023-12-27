import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import HomeScreen from "./pages/home";
import RegistrationScreen from "./pages/register";
import LoginScreen from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import CodeFromTheEmail from "./components/login/codeFromTheEmail";
import NewPassword from "./components/login/newPassword";
import { translationService } from "./services/translationService";
import Hamburger from "./components/side_bar/hamburger";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import TherapistScreen from "./pages/therapist";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <RecordAudio></RecordAudio>
      <StatusBar style="auto" />
    </View>
  );
}
//name of fanction.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
