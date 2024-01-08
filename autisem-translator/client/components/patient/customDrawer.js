import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { Ionicons } from "@expo/vector-icons";
import PatientScreen from "../../pages/patient";
import AssociateTherapist from "./associateTherapist";
import BackgroundSelection from "../side_bar/background_selection";
import CustomDrawerContent from "./customDrawerContent";

const Drawer = createDrawerNavigator();

const generateDrawerIcon =
  (name) =>
  ({ color, size }) =>
    <Ionicons name={name} size={size} color={color} />;

export default function CustomDrawer() {
  const [hasNotifications, setHasNotifications] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          //For the profile
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={PatientScreen}
            options={{ drawerIcon: generateDrawerIcon("home") }}
          />
          <Drawer.Screen
            name="Notifications"
            component={AssociateTherapist}
            options={{
              drawerIcon: ({ color, size }) => (
                <View>
                  <Ionicons name="notifications" size={size} color={color} />
                  {hasNotifications && (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "green",
                        borderRadius: 50,
                        width: 10,
                        height: 10,
                      }}
                    />
                  )}
                </View>
              ),
            }}
          />
          {/* <Drawer.Screen
            name="Notifications"
            component={AssociateTherapist}
            options={{ drawerIcon: generateDrawerIcon("notifications") }}
          /> */}
          <Drawer.Screen
            name="Setting"
            //   component={CustomStack}
            options={{ drawerIcon: generateDrawerIcon("settings") }}
          />
          <Drawer.Screen
            name="Theme"
            component={BackgroundSelection}
            options={{ drawerIcon: generateDrawerIcon("color-palette") }}
          />
          <Drawer.Screen
            name="Language"
            //   component={CustomStack}
            options={{ drawerIcon: generateDrawerIcon("language") }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
