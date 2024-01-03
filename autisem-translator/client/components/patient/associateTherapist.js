import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import GenericButton from "../shared/button";
import { useNavigation } from "@react-navigation/native";

import validations from "../../config/validations";

import { translationService } from "../../services/translationService";
import TextInputField from "../shared/textInputField";

const translate = translationService.translate;

// Form fields configuration
const fields = [
  {
    name: "password",
    placeholder: translate("password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
    accesabilityLabel: "password input",
    accesabilityHint: "enter your password",
  },
];

export default function AssociateTherapist() {
  const navigation = useNavigation();

  const handleGet = () => {
    navigation.navigate("GetTherapst");
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.label}>Get Therapist</Text>
        <Text style={styles.labels}>Get your therapist to Abilisense.</Text>
        <Text style={styles.labels}>It's very easy to get started.</Text>

        <TextInputField
          fields={fields}
          placeholder={translate("password")}
        ></TextInputField>
        <GenericButton onPress={handleGet} title="Get" />
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
});
