import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import NewPassword from "./components/login/newPassword";
import LoginScreen from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import CodeFromTheEmail from "./components/login/codefromtheemail";
import RegistrationScreen from "./pages/register";


export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ cardStyle: styles.container }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotYourPassword" component={ForgotPassword} />
        <Stack.Screen name="New Password" component={NewPassword} />
        <Stack.Screen name="Code From The Email" component={CodeFromTheEmail} />
        {/* <Stack.Screen name="Registration" component={RegistrationScreen} />  */}
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
