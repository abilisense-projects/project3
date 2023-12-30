import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Login from "../components/login/login";
import { translationService } from "../services/translationService";
const translate = translationService.translate;

export default function LoginScreen({ navigation }) {

  const handleRegisterNowPress = () => {
    navigation.navigate("Registration");
  };

  return (
    <View style={styles.modalContent}>
      <Login />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: 'black' }}>
          {translate("don't have an account")}
          <Pressable onPress={handleRegisterNowPress}>
            <Text style={{ color: "green", textDecorationLine: "underline" }}>
              {translate("register here")}
            </Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}

// StyleSheet for styling components
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 40, // Adjust this value as needed
  },
});
