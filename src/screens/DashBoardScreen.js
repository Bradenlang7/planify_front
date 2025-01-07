import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Dashboard</Text>
      </ScrollView>

      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => navigation.navigate("CreatePlan")}
      >
        <Text style={styles.buttonText}>Create Plan!</Text>
      </TouchableOpacity>
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
  bannerButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007BFF", // Button background color
    paddingVertical: 16, // Button height
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
  },
  buttonText: {
    color: "#FFFFFF", // Text color
    fontSize: 18, // Text size
    fontWeight: "bold", // Text weight
  },
});
