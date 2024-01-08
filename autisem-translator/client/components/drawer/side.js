import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import UploadImage from "../shared/uploadImage";

const SideNavigator = ({ navigation, shouldDisplaySideNavigator }) => {
  const [page, setPage] = useState("");

  const pages = ["Notifications", "Settings", "Theme", "Language"];
  const icons = ["notifications", "settings", "color-palette", "language"];
  const user = useSelector((state) => state.user.user);
  const countNotifications = useSelector((state) => state.patient.num);

  useFocusEffect(() => {
    const currentPage =
      navigation.getState().routes[navigation.getState().index].name;
    setPage(currentPage);
  });

  const goToFirstScreen = (pageName) => {
    navigation.reset({
      index: 0,
      routes: [{ name: pageName }],
    });
  };

  if (!shouldDisplaySideNavigator) {
    return null;
  }
  console.log("countNotifications", countNotifications);

  return (
    <View style={styles.drawerContent}>
      <View style={styles.userContainer}>
        <UploadImage />
        {user && <Text style={styles.userName}>{user.userData.firstName}</Text>}
      </View>
      <View style={styles.separator} />
      {pages.map((item, index) => (
        <TouchableOpacity
          style={styles.drawerItem}
          key={index}
          onPress={() => {
            setPage(item);
            console.log("item", item);
            goToFirstScreen(item);
          }}
        >
          {/* Conditionally render the badge for the 'notifications' icon */}

          {icons[index] === "notifications" &&
            countNotifications &&
            countNotifications.numOfUnread > 0 && (
              <View style={styles.notificationBadgeContainer}>
                <Text style={styles.notificationText}>
                  {countNotifications.numOfUnread}
                </Text>
              </View>
            )}
          <Ionicons
            name={icons[index]}
            size={20}
            color={page === item ? "green" : "black"}
            style={styles.icon}
          />
          <Text style={page === item ? { color: "green" } : { color: "black" }}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },
  drawerItem: {
    marginBottom: 20,
    flexDirection: "row", // Add this line
  },
  // iconTextContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  icon: {
    marginRight: 8,
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginBottom: 10,
  },
  notificationBadgeContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "green",
    borderRadius: 10,
    width: 11,
    height: 11,
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid white",
  },

  notificationText: {
    color: "white",
    fontSize: 8,
  },
});

export default SideNavigator;
