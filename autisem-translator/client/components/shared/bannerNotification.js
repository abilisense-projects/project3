import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const BannerNotification = ({ message, severity, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(true);

    const timer = setTimeout(() => {
      setIsModalVisible(false);

      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const { width: screenWidth } = Dimensions.get('window');
  const halfScreenWidth = screenWidth / 2;

  return (
    <Modal
      accessible
      accessibilityLabel='banner notification'
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      <View style={[styles.container, { width: halfScreenWidth }]} accessible>
        <Text style={[styles.message, { color: 'white', backgroundColor: severity === 'error' ? 'red' : 'green' }]}>
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
  },
});

export default BannerNotification;
