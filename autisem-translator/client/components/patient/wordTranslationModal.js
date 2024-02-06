import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import GenericButton from '../shared/button';
import { globalStyles } from '../../styles';
import { translationService } from "../../services/translationService";

const WordTranslationModal = ({ isVisible, onCancel, translationResponse}) => {
    const translate = translationService.translate;
  
    const handleModalCancel = () => {
      onCancel();
    };
  
    return (
      <Modal visible={isVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={globalStyles.whitePaper}>
          <Text>Translation Response:</Text>
          <Text style={styles.translatedWord}>{translationResponse}</Text>
            <GenericButton onPress={handleModalCancel} title={translate('cancel')} buttonWidth={100} />
          </View>
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01461cd6',
    },
    translatedWord: {
        fontSize: 25,
        marginTop: 10,
        color: 'green',
        padding: 15,
    },
});

export default WordTranslationModal;

