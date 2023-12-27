import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import UserService from "../../services/backendServices/userService";
import { translationService } from "../../services/translationService";
const translate = translationService.translate;
import BannerNotification from "../shared/bannerNotification";

const userTypeOptions = [
  { name: translate("select user type"), value: "" },
  { name: translate("therapist"), value: "therapist" },
  { name: translate("patient"), value: "treated" },
];

const fields = [
  {
    name: "userName",
    placeholder: translate("email"),
    type: "text",
    rules: validations.email,
  },
  {
    name: "firstName",
    placeholder: translate("first name"),
    type: "text",
    rules: validations.name,
  },
  {
    name: "lastName",
    placeholder: translate("last name"),
    type: "text",
    rules: validations.name,
  },
  {
    name: "phoneNumber",
    placeholder: translate("phone number"),
    type: "text",
    rules: validations.phoneNumber,
  },
  {
    name: "password",
    placeholder: translate("password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "repeatPassword",
    placeholder: translate("verify password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
  },
  {
    name: "type",
    options: userTypeOptions,
    type: "picker",
    rules: { required: translate("type is required") },
  },
];
//save userName in redux

export default function RegistrationForm() {
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      if (data.type === "therapist") {
        await UserService.createUser(data);
      } else if (data.type === "patient") {
        await UserService.createUser(data);
      }
      setNotification({
        message: translate("created successfully"),
        severity: "success",
      });
    } catch (error) {
      if (error.message === "Username conflict") {
        setErrorMessage(translate("username exists"));
      } else {
        setNotification({
          message: translate("error creating user"),
          severity: "error",
        });
      }
    }
  };

  return (
    <View style={styles.modalContent}>
      {/* check if fields & userTypeOptions are not null */}
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={translate("registration")}
      ></GenericForm>
      {notification && (
        <View>
          <BannerNotification
            message={notification.message}
            severity={notification.severity}
            onClose={() => setNotification(null)}
          />
        </View>
      )}
      {errorMessage && (
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20, // Adequate padding for touch targets
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
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
