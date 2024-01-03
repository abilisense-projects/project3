import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import GenericButton from "../components/shared/button";
import RecordAudio from "../components/recording/recording";

const PatientScreen = () => {
  const navigation = useNavigation();

  const name = useSelector((state) => state.user.user.userData.firstName);
  console.log("firstName ", name);

  const handleAssociateTherapist = () => {
    navigation.navigate("AssociateTherapist");
  };

  // Move the useSelector inside the component
  const user = useSelector((state) => state.userReucer);

  const handleWordListPress = () => {
    return user.listOfWords; // update in DB
  };

  return (
    <View accessible={true}>
      <Text style={styles.label}>hello {name}</Text>
      <Button title="רשימת מילים" onPress={handleWordListPress} />
      <GenericButton onPress={handleAssociateTherapist} title="message" />
      <RecordAudio />
    </View>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 15,
  },
});
