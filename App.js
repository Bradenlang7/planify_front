import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import React, { useEffect } from "react";
import axiosInstance from "./src/api/planify";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProviver } from "./src/context/UserContext";
import { navigationRef } from "./navigationRef";

export default function App() {
  return (
    <UserProviver>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
        </GestureHandlerRootView>
      </AuthProvider>
    </UserProviver>
  );
}

const styles = StyleSheet.create({});
