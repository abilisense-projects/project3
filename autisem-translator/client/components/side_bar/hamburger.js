import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundSelection from './background_selection';
import HamburgerModal from './hamburgerModal';



const Hamburger = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundSelectionVisible, setBackgroundSelectionVisible] = useState(false);

  const closeModal = () => setModalVisible(false);

  const openBackgroundSelection = () => {
    setModalVisible(false);
    setBackgroundSelectionVisible(true);
  };

  const closeBackgroundSelection = () => setBackgroundSelectionVisible(false);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


  return (
    <View style={styles.pageContainer} accessible accessibilityLabel='menu'>
      <Pressable onPress={toggleModal} style={modalVisible ? styles.iconBackground : null}>
        <Icon name="navicon" size={25} color="black" />
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
    //justifyContent: 'flex-start',
  },

  iconBackground: {
    backgroundColor: 'lightgray',
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
});

export default Hamburger;


