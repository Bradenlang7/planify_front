import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import React, { useEffect } from "react";
import axiosInstance from "./src/api/planify";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as PlanProvider } from "./src/context/PlanContext";
import { navigationRef } from "./navigationRef";
import { Provider } from "./src/context/PlanContext";

export default function App() {
  /*
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axiosInstance.get("/api/users/2"); // Replace with a valid backend endpoint
        console.log("Connected successfully:", response.data);
      } catch (error) {
        console.error(
          "Error connecting to the backend:",
          error.response.data.message
        );
        console.error("Status code:", error.response.status);
      }
    };

    testConnection();
  }, []);
  */

  return (
    <PlanProvider>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
        </GestureHandlerRootView>
      </AuthProvider>
    </PlanProvider>
  );
}

const styles = StyleSheet.create({});
