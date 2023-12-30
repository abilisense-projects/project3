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
import { useState } from "react";
import RecordAudio from "./components/recording/recording";
import { Button } from "react-native";
export default function App() {
const Stack = createStackNavigator();


  return (
    <Provider store={store}>
      { <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: styles.container,
            gestureEnabled: false, // Disable gestures to prevent navigation by swiping
            headerShown: false, // Hide the header for all screens
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotYourPassword" component={ForgotPassword} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="CodeFromTheEmail" component={CodeFromTheEmail} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Hamburger" component={Hamburger} />
          <Stack.Screen name="Therapist" component={TherapistScreen} />

        </Stack.Navigator>
      </NavigationContainer> }


    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});