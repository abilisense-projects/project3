import React from "react";
import { Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomHeader = () => {
  console.log("Custom Header");
  return (
    <Ionicons
      name="notifications"
      size={20}
      // color={page === item ? "green" : "black"}
      // style={styles.icon}
    />
  );
};
export default CustomHeader;
