import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import LandingScreen from "./pages/landing";
import RegistrationScreen from "./pages/register";
import LoginScreen from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import CodeFromTheEmail from "./components/login/codeFromTheEmail";
import NewPassword from "./components/login/newPassword";
import store from "./redux/store";
import TherapistScreen from "./pages/therapist";
import PatientScreen from "./pages/patient";
import AssociatePatient from "./components/therapist/associatePatient";
import AssociateTherapist from "./components/patient/associateTherapist";
import AccessOption from "./components/patient/accessOption";
import GetTherapist from "./components/patient/getTherapist";
import BackgroundSelection from "./components/side_bar/background_selection";
import SideNavigator from "./components/drawer/side";
import CustomHeader from "./components/drawer/customHeader";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListOfAssociatedTherapists from "./components/patient/listOfAssociatedTherapists";
import PatientDetails from "./components/therapist/patientDetailes";

const Drawer = createDrawerNavigator();

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };
  return (
    
    <Provider store={store}>
      <NavigationContainer>
        {/* <CustomHeader/> */}
        <Drawer.Navigator
          drawerContent={(props) => (
            <SideNavigator
              {...props}
              shouldDisplaySideNavigator={
                props.state.routes[props.state.index].name !== "Login" &&
                props.state.routes[props.state.index].name !== "Registration" &&
                props.state.routes[props.state.index].name !== "Landing" &&
                props.state.routes[props.state.index].name !== "ForgotYourPassword" &&
                props.state.routes[props.state.index].name !== "CodeFromTheEmail" &&
                props.state.routes[props.state.index].name !== "NewPassword"
              }
              // countNotifications={
              //   props.state.routes[props.state.index].name == "Patient"
              // }
            />
          )}
          drawerPosition={selectedLanguage === "Hebrew" ? "right" : "left"}

          // screenOptions={{
          //   headerShown: true,
          //   header: (props) => <CustomHeader {...props} />,
          
          // }}
        >
          <Drawer.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="ForgotYourPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="CodeFromTheEmail"
            component={CodeFromTheEmail}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Therapist"
            component={TherapistScreen}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="Patient"
            component={PatientScreen}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="Association"
            component={AssociatePatient}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="GetTherapist"
            component={GetTherapist}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="AccessOption"
            component={AccessOption}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="ListOfAssociatedTherapists"
            component={ListOfAssociatedTherapists}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="PatientDetails"
            component={PatientDetails}
            options={{ title: "" }}
          />
          

          {/* all these will appear in the sidebar */}
          {/* <Drawer.Screen name="Home" component={BackgroundSelection} options={{ title: "" }} /> */}
          <Drawer.Screen
            name="Theme"
            component={BackgroundSelection}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="Notifications"
            component={AssociateTherapist}
            options={{ title: "" }}
          />
          <Drawer.Screen
            name="Settings"
            component={PatientScreen}
            options={{ title: "" }}
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
});
export default App;
