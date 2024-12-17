import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import NavLink from "../components/NavLink";
import { Context } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

export default function SignInScreen() {
  const { state, signin } = useContext(Context);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignIn</Text>
      <AuthForm
        headerText={"Sign in"}
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText={"Sign in"}
      />
      <NavLink
        text="Dont have an account? Sign up Instead"
        routeName="SignUp"
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
    marginTop: 100,
  },
});
