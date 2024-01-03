import BackgroundSelection from "./components/side_bar/background_selection";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./pages/home";
import RegistrationScreen from "./pages/register";
import LoginScreen from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import CodeFromTheEmail from "./components/login/codeFromTheEmail";
import NewPassword from "./components/login/newPassword";
import store from "./redux/store";
import TherapistScreen from "./pages/therapist";
import PatientScreen from "./pages/patient";
import HamburgerModal from "./components/side_bar/hamburgerModal";
import AssociatePatient from "./components/therapist/associatePatient";
import AssociateTherapist from "./components/patient/associateTherapist";
import AccessOption from "./components/patient/accessOption";
import GetTherapst from "./components/patient/getTherapist";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const generateDrawerIcon =
  (name) =>
  ({ color, size }) =>
    <Ionicons name={name} size={size} color={color} />;
const CustomStack = () => (
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
    <Stack.Screen name="Therapist" component={TherapistScreen} />
    <Stack.Screen name="Patient" component={PatientScreen} />
    <Stack.Screen name="AssociatePatient" component={AssociatePatient} />
    <Stack.Screen name="GetTherapst" component={GetTherapst} />
    <Stack.Screen name="AccessOption" component={AccessOption} />
    <Stack.Screen name="AssociateTherapist" component={AssociateTherapist} />
  </Stack.Navigator>
);
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={CustomStack}
            options={{ drawerIcon: generateDrawerIcon("home") }}
          />
          <Drawer.Screen
            name="Notifications"
            component={AssociateTherapist}
            options={{ drawerIcon: generateDrawerIcon("notifications") }}
          />
          <Drawer.Screen
            name="Setting"
            component={CustomStack}
            options={{ drawerIcon: generateDrawerIcon("settings") }}
          />
          <Drawer.Screen
            name="Theme"
            component={BackgroundSelection}
            options={{ drawerIcon: generateDrawerIcon("color-palette") }}
          />
          <Drawer.Screen
            name="Language"
            component={CustomStack}
            options={{ drawerIcon: generateDrawerIcon("language") }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  languageContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  languageLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    height: 40,
    marginBottom: 16,
  },
});
export default App;
