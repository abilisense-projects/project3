import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Button, ScrollView, AccessibilityInfo } from 'react-native';

import option1 from './background_options/115.jpg';
import option2 from './background_options/113.jpg';
import option3 from './background_options/119.jpg';
import option4 from './background_options/117.jpg';
import option5 from './background_options/114.jpg';
import option6 from './background_options/110.jpg';

const backgroundOptions = [
  { id: 1, image: option1 },
  { id: 2, image: option2 },
  { id: 3, image: option3 },
  { id: 4, image: option4 },
  { id: 5, image: option5 },
  { id: 6, image: option6 },
];

const BackgroundSelection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [confirmedImage, setConfirmedImage] = useState(null);

  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
    AccessibilityInfo.announceForAccessibility(`Image ${imageId} selected`);
  };

  const handleConfirm = () => {
    if (selectedImage !== null) {
      const selectedOption = backgroundOptions.find((option) => option.id === selectedImage);
      setConfirmedImage(selectedOption.image);
      AccessibilityInfo.announceForAccessibility(`Confirmed Image ${selectedImage}`);
    } else {
      AccessibilityInfo.announceForAccessibility('Please select an image');
    }
  };

  const renderItem = (item) => (
    <TouchableOpacity
      onPress={() => handleImageSelect(item.id)}
      style={[styles.imageContainer, selectedImage === item.id && styles.selectedImage]}
      accessible
      accessibilityLabel={`Background option ${item.id}`}
      accessibilityHint="Double tap to select this background">
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {confirmedImage && <Image source={confirmedImage} style={styles.backgroundImage} />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {backgroundOptions.map((option) => renderItem(option))}
      </ScrollView>
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 12,
  },
  imageContainer: {
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 5,
    overflow: 'hidden',
  },
  selectedImage: {
    borderColor: 'blue',
  },
  image: {
    width: 100,
    height: 120,
  },
});

export default BackgroundSelection;
