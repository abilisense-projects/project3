import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = () => {
  const countNotifications = useSelector((state) => state.patient.num);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

  const handleNotificationsPress = () => {
    // Navigate to 'Manage' component for patients
    navigation.reset({
      index: 0,
      routes: [{ name: "Manage" }],
    });
  };

  const handleLogout = () => {
     navigation.reset({
      index: 0,
      routes: [{ name: "Logout" }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logOutText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.space} />
      {user && user.userData.type === "patient" && (
        <TouchableOpacity
          style={styles.circleContainer}
          onPress={handleNotificationsPress}
        >
          <Ionicons name="notifications" size={20} style={styles.icon} />
          {countNotifications && countNotifications.numOfUnread > 0 && (
            <View style={styles.notificationBadgeContainer}>
              <Text style={styles.notificationText}>
                {countNotifications.numOfUnread}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  space: {
    width: 20, // Adjust the width as needed for the desired spacing
  },
  circleContainer: {
    position: "relative", // Add this line to make position:relative
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    color: "black",
  },
  notificationBadgeContainer: {
    position: "absolute",
    right: -1, // Adjust this value to move the badge to the right side
    top: -1, // Adjust this value to move the badge to the top
    zIndex: 1,
    backgroundColor: "green",
    borderRadius: 10,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1, // Change 'border' to 'borderWidth'
    borderColor: "white", // Add 'borderColor'
  },

  notificationText: {
    color: "white",
    fontSize: 9,
  },
  logOutText: {
    color: "white",
    fontSize: 20,
  },
});
