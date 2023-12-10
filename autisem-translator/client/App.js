import TherapistScreen from './pages/therapist';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import NewPassword from "./components/login/newPassword";
import LoginScreen from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import RegistrationScreen from "./pages/register";
import HomeScreen from "./pages/home";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{cardStyle: styles.container}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forgot your password" component={ForgotPassword} />
        <Stack.Screen name="New Password" component={NewPassword} />
        <Stack.Screen name="Registration" component={RegistrationScreen} /> 
        <Stack.Screen name="TherapistScreen" component={TherapistScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
