import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles";
import { translationService } from '../../services/translationService';

const translate = translationService.translate;



export default function Notifications() {
  return (
    <View style={globalStyles.whitePaper}>
      <View style={styles.noPatientsContainer}>
        <Text style={styles.noPatientsText}>
        {translate("there are no new notifications")}
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
