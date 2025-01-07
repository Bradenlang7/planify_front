import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

export default function AccountScreen() {
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AccountScreen</Text>

      <TouchableOpacity onPress={signout}>
        <Text style={styles.link}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
