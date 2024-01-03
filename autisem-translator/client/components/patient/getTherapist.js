import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GenericButton from "../shared/button";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function GetTherapst() {
  const navigation = useNavigation();
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  //   useEffect(() => {
  //     // Check if there are therapists or patients and update notification status
  //     const hasData = therapists.length > 0 || /* check for patients */;
  //     setHasNotifications(hasData);
  //   }, [therapists /* add other dependencies as needed */]);

  //   // ... rest of the code
  // }

  const therapists = [
    { id: 1, name: "Therapist 1" },
    { id: 2, name: "Therapist 2" },
    // Add more therapists as needed
  ];

  const handleTherapist = (therapist) => {
    setSelectedTherapist(therapist);
  };

  const handleDone = () => {
    if (selectedTherapist) {
      navigation.navigate("AccessOption", { therapist: selectedTherapist });
      console.log(selectedTherapist);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.label}>Look for therapists you know</Text>
        <Text> list of therapist</Text>
        {therapists.map((therapist) => (
          <TouchableOpacity
            key={therapist.id}
            onPress={() => handleTherapist(therapist)}
            style={[
              styles.button,
              selectedTherapist === therapist && { backgroundColor: "green" },
            ]}
          >
            <Text
              style={{
                color: selectedTherapist === therapist ? "white" : "green",
              }}
            >
              {therapist.name}
            </Text>
          </TouchableOpacity>
        ))}

        <GenericButton onPress={handleDone} title="Done" />
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
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
});
