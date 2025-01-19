import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
  Linking,
} from "react-native";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import * as AuthSession from "expo-auth-session";

export default function SignInScreen() {
  const { state, signin } = useContext(AuthContext);

  // Google OAuth2 Configuration
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  };

  const [request, _, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId:
        "549584527464-gl416mhgoqpf73h9lpqccv8are93trfn.apps.googleusercontent.com",
      redirectUri: "https://auth.expo.io/@anonymous/planify-front", //Hard coded. NEED TO CHANGE
      scopes: ["openid", "profile", "email"],
      responseType: "code",
    },
    discovery
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <Text style={styles.title}>SignIn</Text>
      <AuthForm
        headerText={"Sign in"}
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText={"Sign in"}
      />
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
      <NavLink
        text="Dont have an account? Sign up Instead"
        routeName="SignUp"
      />
    </KeyboardAvoidingView>
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
