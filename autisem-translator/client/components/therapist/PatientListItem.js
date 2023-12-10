// PatientListItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PatientListItem = ({ item, onRemovePress }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
    <TouchableOpacity onPress={() => onRemovePress(item.id)}>
      <Icon name="trash-2" size={20} color="green" />
    </TouchableOpacity>
    <Text>{item.name}</Text>
  </View>
);

export default PatientListItem;
