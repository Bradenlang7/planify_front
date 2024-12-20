import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { Context as AuthContext } from "../context/AuthContext";

export default function SignUpScreen() {
  const { state, signup } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <SignUpForm
        headerText={"Sign up"}
        errorMessage={state.errorMessage}
        onSubmit={signup}
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
