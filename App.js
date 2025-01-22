import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProviver } from "./src/context/UserContext";
import { Provider as FrienshipProviver } from "./src/context/FriendshipsContext";

export default function App() {
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
