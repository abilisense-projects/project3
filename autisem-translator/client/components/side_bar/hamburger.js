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

  // const toggleModal = () => {
  //   modalVisible ? closeModal() : setModalVisible(true);
  // };

//   const toggleModal = () => {
//     if (modalVisible || backgroundSelectionVisible) {
//       console.log("לחצת וזה פתוח")
//       setModalVisible(false);
//       setBackgroundSelectionVisible(false);
//     } else {
//       setModalVisible(true);
//       console.log("לחצת וזה היה סגור")
//     }
//   };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


  return (
    <View style={styles.pageContainer}>
      <Pressable onPress={toggleModal} style={modalVisible ? styles.iconBackground : null}>
        <Icon name="navicon" size={25} color="black" />
      </Pressable>
      <HamburgerModal modalVisible={modalVisible} closeModal={closeModal} openBackgroundSelection={openBackgroundSelection}/>
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

  iconBackground: {
    backgroundColor: 'lightgray',
    padding: 4,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export default Hamburger;

