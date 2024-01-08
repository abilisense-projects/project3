import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericButton from "../components/shared/button";
import { translationService } from "../services/translationService";

const translate = translationService.translate;
export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View accessible={true} style={styles.modalContent}>
      <GenericButton
        title={translate("login")}
        onPress={() => navigateToScreen("Login")}
        buttonWidth={80}
      />
    </View>
  );
}

// StyleSheet for styling components
const styles = StyleSheet.create({
  // modalContent: {
  //   backgroundColor: "white",
  //   padding: 20,
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 2,
  //   elevation: 3,
  //   marginTop: 40, // Adjust this value as needed
  // },
});
