import React, { useState } from "react";
import { View, Text, Pressable, CheckBox } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";

const fields = [
  {
    name: "userName",
    placeholder: "Enter your email",
    type: "text",
    rules: validations.email,
  },
  {
    name: "password",
    placeholder: "Enter your password",
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "forgotPassword",
    type: "link",
    onPress: (navigation) => navigation.navigate("Forgot your password"),
    text: "Forgot your password?",
  },
];

export default function Login() {
  const navigation = useNavigation();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (data) => {
    //clear form?
    //Handle form submission logic
    //save the data in db
    //did all data go through validations / wran user
    //save data / send to server
    console.log("Form data:", data);
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton="Login"
        navigation={navigation}
      ></GenericForm>
      <Pressable onPress={() => navigation.navigate("ForgotYourPassword")}>
        <Text style={{ color: "blue" }}>Forgot your password?</Text>
      </Pressable>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>Remember me</Text>
      </View>
    </View>
  );
}
