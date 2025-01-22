import React, { useEffect, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { useApprovedFriendships } from "../hooks/useApprovedFriendships";

const SessionLoaderScreen = () => {
  const navigation = useNavigation();
  const { loadUserName } = useContext(UserContext);
  const { error: approvedFriendshipsError } = useApprovedFriendships(); //Get users list of friends

  useEffect(() => {
    const initializeSession = async () => {
      try {
        await loadUserName();

        if (approvedFriendshipsError) {
          console.error(
            "Error loading approved friendships:",
            approvedFriendshipsError
          );
          return;
        }

        navigation.navigate("MainApp");
      } catch (err) {
        console.error("Error initializing session:", err);
      }
    };

    initializeSession();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SessionLoaderScreen;
