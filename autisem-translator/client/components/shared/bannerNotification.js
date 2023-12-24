import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, AccessibilityInfo, findNodeHandle } from 'react-native';
import Modal from 'react-native-modal';

const BannerNotification = ({ message, severity, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const messageRef = React.useRef(null);

  useEffect(() => {
    setIsModalVisible(true);

    // When the modal is visible, focus the screen reader on the message
    if (messageRef.current) {
      const tag = findNodeHandle(messageRef.current);
      AccessibilityInfo.setAccessibilityFocus(tag);
    }

    const timer = setTimeout(() => {
      setIsModalVisible(false);

      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, severity, onClose]);

  const { width: screenWidth } = Dimensions.get('window');
  const halfScreenWidth = screenWidth / 2;

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onBackdropPress={() => setIsModalVisible(false)} // Allow users to dismiss by tapping outside
    >
      <View style={[styles.container, { width: halfScreenWidth}]}>
        <Text
          ref={messageRef}
          style={[
            styles.message, 
            { color: 'white', backgroundColor: severity === 'error' ? 'red' : 'green' }
          ]}
          accessible
          accessibilityLabel={`Notification: ${message}`}
          accessibilityLiveRegion="polite" // Announce changes to screen reader users
          accessibilityRole="alert" // Marks the text as an alert message
        >
          {message}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10, // Ensure sufficient padding for readability and touch
  },
});

export default BannerNotification;
