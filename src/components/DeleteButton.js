import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DeleteButton = ({ onPressFunction }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={async () => {
        await onPressFunction();
        navigation.goBack();
      }}
    >
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeleteButton;
