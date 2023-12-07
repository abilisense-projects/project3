import React, { useState } from 'react';
import { View, Pressable, Modal, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackgroundSelection from './background_selection';


const HamburgerModal = ({ modalVisible, closeModal, openBackgroundSelection  }) => (
  <Modal transparent visible={modalVisible} onRequestClose={closeModal}> 
    <Pressable style={styles.modalBackground} onPress={closeModal}>
    <View style={styles.modalContainer}>
    <Text>modal</Text>
      <Pressable style={styles.backgroundButton} onPress={openBackgroundSelection}>
            <Text>Open Background Selection</Text>
      </Pressable>
    </View>
    </Pressable>
  </Modal>
);


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

  modalBackground: {
    left: 20, 
    top: 50,  
    flex: 1,
  },
    
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    padding: 20,
    height: 400, 
    width: 250, 
  },
  backgroundButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },

});

export default Hamburger;

