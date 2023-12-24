import React, { useState } from 'react';

import { View, Pressable, Modal, StyleSheet, Text, AccessibilityInfo } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundSelection from './background_selection';
import HamburgerModal from './hamburgerModal';

const HamburgerModal = ({ modalVisible, closeModal, openBackgroundSelection }) => (
  <Modal
    transparent
    visible={modalVisible}
    onRequestClose={closeModal}
    accessible
    accessibilityLabel="Settings Menu"
  >
    <Pressable style={styles.modalBackground} onPress={closeModal} accessible accessibilityLabel="Close Menu">
      <View style={styles.modalContainer}>
        <Pressable style={styles.backgroundButton} onPress={openBackgroundSelection} accessible accessibilityLabel="Open Background Selection">
          <Text>Open Background Selection</Text>
        </Pressable>
      </View>
    </Pressable>
  </Modal>
);

const Hamburger = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundSelectionVisible, setBackgroundSelectionVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    AccessibilityInfo.announceForAccessibility("Settings menu opened");
  };
  const closeModal = () => {
    setModalVisible(false);
    AccessibilityInfo.announceForAccessibility("Settings menu closed");
  };
  const openBackgroundSelection = () => {
    setModalVisible(false);
    setBackgroundSelectionVisible(true);
    AccessibilityInfo.announceForAccessibility("Background selection opened");
  };
  const closeBackgroundSelection = () => {
    setBackgroundSelectionVisible(false);
    AccessibilityInfo.announceForAccessibility("Background selection closed");
  };

  return (
    <View style={styles.pageContainer}>
      <Pressable onPress={openModal} accessible accessibilityLabel="Open Menu">
        <Icon name="navicon" size={30} color="black" />
      </Pressable>
      <HamburgerModal modalVisible={modalVisible} closeModal={closeModal} openBackgroundSelection={openBackgroundSelection} />
      {backgroundSelectionVisible && <BackgroundSelection onClose={closeBackgroundSelection} />}
    </View>
  );
};
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 20,
    marginRight: 'auto',
  },
});

export default Hamburger;
