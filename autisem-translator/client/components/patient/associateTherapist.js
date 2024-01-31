import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import GenericButton from "../shared/button";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import validations from "../../config/validations";
import UserService from "../../services/backendServices/userService";
import { translationService } from "../../services/translationService";
import GenericForm from "../shared/form";

const translate = translationService.translate;

// Form fields configuration
const fields = [
  {
    name: "password",
    placeholder: translate("enter your password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
    accesabilityLabel: "password input",
    accesabilityHint: "enter your password",
  },
];

export default function AssociateTherapist() {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userName = useSelector((state) => state.user.user.userData.userName);

  const onGet = async (data) => {
    try {
      // Set loading state to true to indicate that the login is in progress
      setIsLoading(true);
      const response = await UserService.loginUser({
        userName: userName,
        password: data.password,
      });

      if (response.message === "User exists") {
        navigation.navigate("ManagementByTheParent");
        // Clear error message if the user exists
        setErrorMessage(null);
      } else {
        // Set error message if the login credentials are incorrect
        setErrorMessage("The password is incorrect, try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading state to false after the validation is complete
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.label}>{translate("manage Therapist")}</Text>
        <Text style={styles.labels}>{translate("get your therapist to Abilisense")}</Text>
        <Text style={styles.labels}>{translate("it's very easy to get started")}</Text>

        <GenericForm
          accessible={true}
          fields={fields}
          onSubmit={onGet}
          navigation={navigation}
          submitButton={isLoading ? translate("verifying") : translate("get")}
          disabledButton={isLoading}
        ></GenericForm>

        <Text style={styles.errorText} accessible>
          {errorMessage}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
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
  },
  label: {
    fontSize: 25,
    marginBottom: 8,
  },
  labels: {
    fontSize: 15,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
