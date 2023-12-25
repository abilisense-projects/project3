import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { translationService } from "../../services/translationService";
import UserService from "../../services/backendServices/userService";

const translate = translationService.translate;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userAction";

const fields = [
  {
    name: "userName",
    placeholder: translate("email"),
    type: "text",
    rules: validations.email,
  },
  {
    name: "password",
    placeholder: translate("password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "forgotPassword",
    type: "link",
    onPress: (navigation) => navigation.navigate("ForgotYourPassword"),
    text: translate("forgot your password"),
  },
];

export default function Login() {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      setIsLoading(true);
      const response = await UserService.loginUser(data);
      console.log("Response object:", response);
      console.log('response', response);
      if (response.message === "User exists") {
        setErrorMessage(null);
      } else {
        setErrorMessage("The email or password is incorrect, try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading state to false after the validation is complete
      setIsLoading(false);
    }
    dispatch(setUser(data)); //This is for the meantime, untill the login request will be perfect.
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        // submitButton={translate("login")}
        navigation={navigation}
        submitButton={isLoading ? "Verifying..." : "login"}
        disabled={isLoading}
      ></GenericForm>
      <Text style={styles.errorText}>{errorMessage}</Text>

      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>{translate('remember me')}</Text>
      </View> */}
    </View>
  );
}
