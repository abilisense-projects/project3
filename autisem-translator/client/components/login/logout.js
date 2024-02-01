import React from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import GenericButton from "../shared/button";
import { globalStyles } from "../../styles";

const Logout = () => {
    const navigation = useNavigation();

  const handleLogout = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("password");

    // Navigate to the landing screen
    navigation.navigate("Landing"); 
  };

  return (
    <View style={globalStyles.whitePaper}>
      <Text>Are you sure you want to logout?</Text>
      <GenericButton title="Logout" onPress={handleLogout} buttonWidth = {80} />
    </View>
  );
};

export default Logout;


