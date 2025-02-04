import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SubmitButton = ({ onPressFunction, navRoute }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPressFunction()}>
      <Text style={styles.buttonText}>Add Invitees</Text>
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
