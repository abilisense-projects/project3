import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles";

export default function Notifications() {
  return (
    <View style={globalStyles.whitePaper}>
      <View style={styles.noPatientsContainer}>
        <Text style={styles.noPatientsText}>
          There are no new notifications
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noPatientsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noPatientsText: {
    fontSize: 18,
    marginBottom: 16,
  },
});
