import React from "react";
import { View, StyleSheet, TouchableOpacity,Text} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


const CustomHeader = () => {
  const countNotifications = useSelector((state) => state.patient.num);
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to 'AssociateTherapist' component
    navigation.reset({
      index: 0,
      routes: [{ name: 'Manage' }]
    });
    // navigation.navigate('Manage');
  };

  return (
    <TouchableOpacity style={styles.circleContainer} onPress={handlePress}>
    <Ionicons name="notifications" size={20} style={styles.icon} />
    {countNotifications && countNotifications.numOfUnread > 0 && (
      <View style={styles.notificationBadgeContainer}>
        <Text style={styles.notificationText}>
          {countNotifications.numOfUnread}
        </Text>
      </View>
    )}
  </TouchableOpacity>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  circleContainer: {
    position: 'relative',  // Add this line to make position:relative
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    color: 'black',
  },
  notificationBadgeContainer: {
    position: 'absolute',
    right: -1,  // Adjust this value to move the badge to the right side
    top: -1,   // Adjust this value to move the badge to the top
    zIndex: 1,
    backgroundColor: 'green',
    borderRadius: 10,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,  // Change 'border' to 'borderWidth'
    borderColor: 'white',  // Add 'borderColor'
  },

  notificationText: {
    color: 'white',
    fontSize: 9,
  },
});
