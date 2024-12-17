import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <AuthForm
        headerText={"Sign in"}
        errorMessage={null}
        onSubmit={null}
        submitButtonText={"Sign in"}
      />
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
