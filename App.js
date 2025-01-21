import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import React, { useEffect } from "react";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProviver } from "./src/context/UserContext";
import { Provider as FrienshipProviver } from "./src/context/FriendshipsContext";
import * as Linking from "expo-linking";
import { saveSecureData } from "./src/utils/SecureStorageService";

export default function App() {
  /*//Deep Linking logic
  useEffect(() => {
    console.log("Running Deep Linking Logic");

    const handleDeepLink = async (event) => {
      console.log("Deep link triggered:", event.url);

      const url = event.url;
      const params = new URL(url).searchParams;
      const token = params.get("token");
      const userName = params.get("userName");

      if (token && userName) {
        console.log("Token:", token, "UserName:", userName);
        await saveSecureData("token", token);
        await saveSecureData("userName", userName);
        navigationRef.current?.navigate("MainApp");
      } else {
        console.error("Token or userName missing in the deep link");
      }
    };

    // Add a listener for deep links while the app is running
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Handle app launch via a deep link
    Linking.getInitialURL().then((url) => {
      console.log("Initial URL:", url);
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

*/

  return (
    <FrienshipProviver>
      <UserProviver>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigator />
          </GestureHandlerRootView>
        </AuthProvider>
      </UserProviver>
    </FrienshipProviver>
  );
}

const styles = StyleSheet.create({});
