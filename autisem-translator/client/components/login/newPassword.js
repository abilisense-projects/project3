import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleNewPassword = () => {
    // Add your login logic here
    // Check if passwords match
    if (newPassword === repeatPassword) {
      // Passwords match, continue with your logic
      console.log("New Password:", newPassword);
      console.log("Repeat Password:", repeatPassword);
      setPasswordsMatch(true);
    } else {
      // Passwords do not match, show an error message
      console.log("Passwords do not match!");
      setPasswordsMatch(false);
    }
  };

  return (
    <View>
      <Text>New Password</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Text>Repeat password</Text>
      <TextInput
        value={repeatPassword}
        onChangeText={setrepeatPassword}
        secureTextEntry
      />
      {!passwordsMatch && (
        <Text style={{ color: "red" }}>Passwords do not match!</Text>
      )}

      <Pressable
        onPress={handleNewPassword}
        style={{ backgroundColor: "#0f968c", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Save </Text>
      </Pressable>
    </View>
  );
}
