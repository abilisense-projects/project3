import React, { useState } from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  AccessibilityInfo,
} from "react-native";
import UserService from "../../services/backendServices/userService";
import { useDispatch, useSelector } from "react-redux";
import GenericButton from "../shared/button";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../redux/actions/userAction";


import option1 from "./background_options/115.jpg";
import option2 from "./background_options/113.jpg";
import option3 from "./background_options/119.jpg";
import option4 from "./background_options/117.jpg";
import option5 from "./background_options/114.jpg";
import option6 from "./background_options/110.jpg";


const backgroundOptions = [
  { id: 1, image: option1 },
  { id: 2, image: option2 },
  { id: 3, image: option3 },
  { id: 4, image: option4 },
  { id: 5, image: option5 },
  { id: 6, image: option6 },
];

const BackgroundSelection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user.userData);
  const userName = useSelector((state) => state.user.user.userData.userName);

  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
  };

  const handleConfirm = async () => {
    if (selectedImage !== null) {
      const selectedOption = backgroundOptions.find(
        (option) => option.id === selectedImage
      );
      const response = await UserService.updateImage({
        userName: userName,
        image: selectedOption.image,
      });
      const updatedUser = { ...user, image: selectedOption.image };
      dispatch(setUser(updatedUser));
      navigation.reset({
        index: 0,
        routes: [{ name: "Patient" }]
      });
    } else {
      AccessibilityInfo.announceForAccessibility("Please select an image");
    }
  };

  const renderItem = (item) => (
    <Pressable
      key={item.id}
      accessible
      accessibilityLabel="background image"
      onPress={() => handleImageSelect(item.id)}
      style={[
        styles.imageContainer,
        selectedImage === item.id && styles.selectedImage,
      ]}
    >
      <Image source={item.image} style={styles.image} />
    </Pressable>
  );

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="background image selection"
    >
      {selectedImage && (
        <Image
          source={backgroundOptions.find(option => option.id === selectedImage).image}
          style={styles.backgroundImage}
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {backgroundOptions.map((option) => renderItem(option))}
      </ScrollView>

      <View style={styles.ConfirmButton}>
        <GenericButton buttonWidth={100} title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },

  ConfirmButton:{
    marginBottom: 65,

  }, 

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, //chek that....this on 1
  },

  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 12,
  },

  imageContainer: {
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 5,
    overflow: "hidden",
  },
  selectedImage: {
    borderColor: "green",
  },
  image: {
    width: 100,
    height: 120,
  },
});

export default BackgroundSelection;

