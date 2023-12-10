// RemoveButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const RemoveButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>Remove Patient</Text>
  </TouchableOpacity>
);

export default RemoveButton;
