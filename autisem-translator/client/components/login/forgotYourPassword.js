import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function ForgotYourPassword() {
  const navigation = useNavigation();

  const [useremail, setUseremail] = useState("");

  const handleUseremail = () => {
    // Add your login logic here
    console.log("useremail:", useremail);
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={useremail} onChangeText={setUseremail} />

      <Pressable
        onPress={() => {
          handleUseremail();
          navigation.navigate("New Password");
        }}
        style={{ backgroundColor: "#0f968c", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Reset Password{" "}
        </Text>
      </Pressable>
    </View>
  );
}
