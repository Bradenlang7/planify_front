import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const SubmitButton = ({ onPressFunction, text }) => {
  return (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={() => onPressFunction()}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SubmitButton;
