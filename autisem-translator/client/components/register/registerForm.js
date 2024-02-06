import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import UserService from "../../services/backendServices/userService";
import { translationService } from "../../services/translationService";
import BannerNotification from "../shared/bannerNotification";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userAction";
import { globalStyles } from '../../styles';
import { Ionicons } from "@expo/vector-icons";


const translate = translationService.translate;

const userTypeOptions = [
  { name: translate("select user type"), value: "" },
  { name: translate("therapist"), value: "therapist" },
  { name: translate("patient"), value: "patient" },
];

const fields = [
  {
    name: "userName",
    placeholder: translate("email"),
    type: "text",
    rules: validations.email,
    accesabilityLabel: "username input",
    accesabilityHint: "enter your username",
  },
  {
    name: "firstName",
    placeholder: translate("first name"),
    type: "text",
    rules: validations.name,
    accesabilityLabel: "first name input",
    accesabilityHint: "enter your first name",
  },
  {
    name: "lastName",
    placeholder: translate("last name"),
    type: "text",
    rules: validations.name,
    accesabilityLabel: "last name input",
    accesabilityHint: "enter your last name",
  },
  {
    name: "phoneNumber",
    placeholder: translate("phone number"),
    type: "text",
    rules: validations.phoneNumber,
    accesabilityLabel: "phone number input",
    accesabilityHint: "enter your phone number",
  },
  {
    name: "password",
    placeholder: translate("password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
    accesabilityLabel: "password input",
    accesabilityHint: "enter your password",
  },
  {
    name: "repeatPassword",
    placeholder: translate("verify password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
    accesabilityLabel: "password verification input",
    accesabilityHint: "verify your password",
  },
  {
    name: "type",
    options: userTypeOptions,
    type: "picker",
    rules: { required: translate("type is required") },
    accesabilityLabel: "user type input",
    accesabilityHint: "select your user type",
  },
];
//save userName in redux

export default function RegistrationForm() {
  const navigation = useNavigation();
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  


  const onSubmit = async (data) => {
    try {
      const _id = await UserService.createUser(data);
      const dataWithUserId = { ...data, _id };
      dispatch(setUser(dataWithUserId));
      //setNotification({ message: translate('created successfully'), severity: 'success' });
      if (data.type == "therapist") {
        navigation.navigate("Therapist");
      } else {
        navigation.navigate("Patient")
      }
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
  const handleArrowBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Landing" }]
    });
  };

  return (
    <View style={globalStyles.whitePaper} accessible accessibilityLabel="registration screen">
      {/* check if fields & userTypeOptions are not null */}
      <View style={styles.arrowIconContainer}>
        <Ionicons name="arrow-forward" size={25} color="green" onPress={handleArrowBack}/>
        </View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={translate("registration")}
        
      ></GenericForm>
      {notification && (
        <View accessible>
          <BannerNotification
            message={notification.message}
            severity={notification.severity}
            onClose={() => setNotification(null)}
          />
        </View>
      )}
      {errorMessage && (
        <View accessible>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
  },
  arrowIconContainer: {
    alignSelf: 'flex-end',
    // marginTop: 10,
  },
});
