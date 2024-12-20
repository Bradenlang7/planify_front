import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { getSecureData } from "../../SecureStorageService";
import AuthForm from "../components/AuthForm";
import planifyApi from "../api/planify";

export default function SignInScreen() {
  const tryLocalSignin = async () => {
    console.log("Trying to retrieve token...");
    const token = await getSecureData("token");

    // Check if token exists
    if (token) {
      console.log("Token found:", token);
      try {
        console.log("Sending token to backend for validation...");
        const response = await planifyApi.post("/api/auth/validate-token");
        console.log("Token validation complete.");
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
      } catch (error) {
        console.error(
          "Error during token validation:",
          error.response?.data || error.message
        );
      }
    } else {
      console.log("No token found.");
    }

    console.log("Exiting tryLocalSignin.");
  };

  const { state, signin } = useContext(AuthContext);
  // Call `tryLocalSignin` when the component is mounted
  useEffect(() => {
    tryLocalSignin(); // Check token validity and navigate if valid
  }, []); // Empty dependency array ensures this runs ßonly once on component mount

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
