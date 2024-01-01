import React from "react";
import { View, Button, Text } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

// const user = useSelector((state) => state.userReucer);
const PatientScreen = () => {
  const name = useSelector((state) => state.user.user.userData.firstName);
  console.log("firstName ", name);
  // Move the useSelector inside the component
  // const user = useSelector((state) => state.userReucer);

  const handleWordListPress = () => {
    return user.listOfWords; // update in DB
  };

  return (
    <View accessible={true}>
      <Text>hello {name}</Text>
      <Button title="רשימת מילים" onPress={handleWordListPress} />
    </View>
  );
};

export default PatientScreen;
