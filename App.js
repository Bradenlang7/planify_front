import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/utils/QueryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigator />
          </GestureHandlerRootView>
        </AuthProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
