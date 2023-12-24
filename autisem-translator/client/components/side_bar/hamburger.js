import React, { useState } from 'react';
import { View, Pressable,  StyleSheet,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundSelection from './background_selection';
import HamburgerModal from './hamburgerModal';



const Hamburger = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundSelectionVisible, setBackgroundSelectionVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openBackgroundSelection = () => {
    setModalVisible(false);
    setBackgroundSelectionVisible(true);
  };

  const closeBackgroundSelection = () => setBackgroundSelectionVisible(false);

  return (
    <View style={styles.pageContainer}>
      <Pressable onPress={openModal}>
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
