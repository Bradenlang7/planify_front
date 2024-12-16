import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CreatePlanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Plan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
