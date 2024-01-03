import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const GenericButton = ({ onPress, title, isDisabled, buttonWidth }) => {
  return (
    <Pressable
      accessible
      accessibilityLabel={title}
      style={[
        styles.button,
        { opacity: isDisabled ? 0.5 : 1, width: buttonWidth || "auto" },
      ]}
      //   disabled={isDisabled}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GenericButton;
