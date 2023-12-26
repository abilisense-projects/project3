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

export default function App() {
  translationService.initializeLanguage();
  useEffect(() => {
    if (translationService.getLanguage() === "he") {
      document.dir = "rtl";
    }
  }, []);

  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ cardStyle: styles.container }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            accessibilityLabel="This is Home Page"
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotYourPassword" component={ForgotPassword} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="CodeFromTheEmail" component={CodeFromTheEmail} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
        {/* <Hamburger accessible={true}
          accessibilityLabel="Open navigation menu" /> */}
      </NavigationContainer>
    </Provider>
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
