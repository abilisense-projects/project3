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

  const pages = [homePage, "Manage", "Settings", "Theme", "Language"];
  const icons = ["home", "notifications", "settings", "color-palette", "language"];
  const languages = ["English","Hebrew"];
  const countNotifications = useSelector((state) => state.patient.num);

  useFocusEffect(() => {
    const currentPage =
      navigation.getState().routes[navigation.getState().index].name;
    setPage(currentPage);
  });

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
    onLanguageChange(language); // קריאה לפונקצית הקולבק לעדכון השפה בקומפוננטת האב
  
    if (language === 'Hebrew') {
      console.log('נבחר עברית');
      translationService.storeLanguage('he');
    } else if (language === 'English') {
      console.log('Selected English');
      translationService.storeLanguage('en');
    }
  
    translationService.initializeLanguage();
    setShowLanguageList(false); // הסתרת רשימת השפות לאחר בחירה
    console.log("Language selected:", language);
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
            goToFirstScreen(item);
            if (item === "Language") {
              handleLanguageIconClick();
            }
          }}
        >
          {/* Conditionally render the badge for the 'notifications' icon */}

          {icons[index] === "notifications" &&
            countNotifications &&
            countNotifications.numOfUnread > 0 && (
              <View style={styles.notificationBadgeContainer}>
                <Text style={styles.notificationText}>
                  {countNotifications.numOfUnread}
                </Text>
              </View>
            )}
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
            // onPress={() => {
              // setPage(item);
              // setSelectedLanguage(item);
              // if (item === 'Hebrew') {
              //   translationService.storeLanguage('he');
                
              // } else if (item === 'English') {
              //   translationService.storeLanguage('en');
              // }
              // translationService.initializeLanguage();
          
              // setShowLanguageList(false);
              // goToFirstScreen(item);
            // }} 
          >
            <Text style={page === item ? { color: "green" } : { color: "black" }}>
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
    flexDirection: "row", // Add this line
  },
  // iconTextContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
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
  notificationBadgeContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "green",
    borderRadius: 10,
    width: 11,
    height: 11,
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid white",
  },

  notificationText: {
    color: "white",
    fontSize: 8,
  },
  language:{
    marginBottom: 15,
    flexDirection: "row",
    marginLeft: 30,
    
  },
});

export default SideNavigator;
