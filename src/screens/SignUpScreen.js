import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SignUpForm from "../components/SignUpForm";
import { Context as AuthContext } from "../context/AuthContext";

export default function SignUpScreen() {
  const { state, signup } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Text style={styles.title}>SignUp</Text>
        <SignUpForm
          headerText={"Sign up"}
          errorMessage={state.errorMessage}
          onSubmit={signup}
          submitButtonText={"Sign in"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
});
