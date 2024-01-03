import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GenericButton from "../shared/button";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AccessOption() {
  const navigation = useNavigation();

  const route = useRoute();
  const { therapist } = route.params || {};

  const handleModalCancel = () => {
    navigation.navigate("GetTherapst");
  };

  const handleModalOk = () => {
    // Perform the action to add the therapist to the patient's database
    // You may call an API or dispatch an action to update the state
    // Example: dispatch(addTherapistToPatient(therapist));
    // Then navigate back to the previous screen
    // navigation.navigate("GetTherapst");
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        {therapist && (
          <>
            <Text style={styles.label}>
              {therapist.name} wants to access your Abilisense account
            </Text>
            <Text>
              This will allow {therapist.name} to perform operations on your
              Abilisense account
            </Text>
            <Text>
              It is possible that your sensitive information will be shared with
              the
              {therapist.name}. You can always add or remove access.
            </Text>
          </>
        )}
        <View style={styles.buttonContainer}>
          <GenericButton
            onPress={handleModalCancel}
            title="Cancel"
            buttonWidth={80}
          />
          <View style={styles.buttonSpacer} />
          <GenericButton
            //   onPress={handleModalOk}
            title="Allow"
            buttonWidth={80}
          />
        </View>
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
    fontSize: 20,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row", // Set the direction to row
    justifyContent: "center", // Adjust as needed
  },
  buttonSpacer: {
    width: 20, // Adjust as needed for the desired space
  },
});
