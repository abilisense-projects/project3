import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import UploadImage from "../shared/uploadImage";
import { translationService } from "../../services/translationService";

const SideNavigator = ({ navigation, shouldDisplaySideNavigator, onLanguageChange }) => {
  const [page, setPage] = useState("");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageList, setShowLanguageList] = useState(true);
  const user = useSelector((state) => state.user.user);
  let homePage = "";
  if (user) {
    const type = user.userData.type;
    if (type === "therapist") {
      homePage = "Therapist";
    } else if (type === "patient") {
      homePage = "Patient";
    }
  }

  const pages = [homePage, "Notifications", "Settings", "Theme", "Language"];
  const icons = ["home", "notifications", "settings", "color-palette", "language"];
  const languages = ["English","Hebrew"];

  useFocusEffect(() => {
    const currentPage =
      navigation.getState().routes[navigation.getState().index].name;
    setPage(currentPage);
  });

  const CloseDrawerButton = () => (
    <Pressable
      style={styles.closeButton}
      onPress={() => navigation.closeDrawer()} // This line closes the drawer
    >
      <Ionicons name="close" size={30} color="#000" />
    </Pressable>
  );

  const goToFirstScreen = (pageName) => {
    navigation.reset({
      index: 0,
      routes: [{ name: pageName }],
    });
  };

  const handleLanguageIconClick = () => {
    setPage("Language");
    setShowLanguageOptions(!showLanguageOptions);
    setOverlayVisible(!showLanguageOptions);
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
  
    if (language === 'Hebrew') {
      setShowLanguageOptions(false);  // Close language options
      setOverlayVisible(false);  // Close overlay
      translationService.storeLanguage('he');
      // Add logic to stay on the current page
      if (page !== "Language") {
        goToFirstScreen(page);
      }
  
    } else if (language === 'English') {
      setShowLanguageOptions(false);  // Close language options
      setOverlayVisible(false);  // Close overlay
      translationService.storeLanguage('en');
      // Add logic to stay on the current page
      if (page !== "Language") {
        goToFirstScreen(page);
      }
    }
  
    translationService.initializeLanguage();
    setShowLanguageList(false);
  };

  const handleOverlayPress = () => {
    setShowLanguageOptions(false);
    setOverlayVisible(false);
  };

  if (!shouldDisplaySideNavigator) {
    return null;
  }

  return (
    <View style={styles.drawerContent}>
       <CloseDrawerButton />
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={[styles.overlay, { display: overlayVisible ? "flex" : "none" }]} />
      </TouchableWithoutFeedback>
      <View style={styles.userContainer}>
        <UploadImage />
        {user && <Text style={styles.userName}>{user.userData.firstName}</Text>}
      </View>
      <View style={styles.separator} />
      {pages.map((item, index) => (
        <Pressable
          style={styles.drawerItem}
          key={index}
          onPress={() => {
            setPage(item);
            if (item === "Language") {
              handleLanguageIconClick();
            } else{
              goToFirstScreen(item);
            }
          }}
        >
          <Ionicons
            name={icons[index]}
            size={20}
            color={page === item ? "green" : "black"}
            style={styles.icon}
          />
          <Text style={page === item ? { color: "green" } : { color: "black" }}>
            {item}
          </Text>
        </Pressable>
      ))}
      
      {showLanguageOptions && (
        <View>
          {languages.map((item, index) => (
            <Pressable
              style={styles.language}
              key={index}
              onPress={() => handleLanguageSelection(item)}
            >
              <Text style={selectedLanguage === item ? { color: "green" } : { color: "black" }}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },
  drawerItem: {
    marginBottom: 20,
    flexDirection: "row",
  },
  icon: {
    marginRight: 8,
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginBottom: 10,
  },
  language:{
    marginBottom: 15,
    flexDirection: "row",
    marginLeft: 30,    
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  }
});

export default SideNavigator;
