import React, { useState } from "react";
import { View, Text, TextInput, Pressable, CheckBox } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <View>
      <Text>Username or primary email</Text>
      <TextInput value={username} onChangeText={setUsername} />

      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Pressable onPress={() => navigation.navigate("Forgot your password")}>
        <Text style={{ color: "red" }}>Forgot your password?</Text>
      </Pressable>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>Remember me</Text>
      </View>

      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}
