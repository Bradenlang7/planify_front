import React, { useState, useCallback, useEffect, useContext } from "react";
import { useApprovedPlans } from "../hooks/useApprovedPlans";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PlanTile from "../components/PlanTile";
import { useNavigation } from "@react-navigation/native";

export default function DashboardScreen() {
  const navigation = useNavigation();

  const { data: approvedPlans = [] } = useApprovedPlans(); // fetch users plans from the

  const handlePlanPress = (plan) => {
    navigation.navigate("PlanFlow", {
      screen: "PlanDetails",
      params: { planId: plan.id },
    });
  };

  useEffect(() => {
    console.log("Screen Mounted");

    return () => {
      console.log("Screen Unmounted");
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {approvedPlans.length > 0 ? (
        <FlatList
          data={approvedPlans}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // Display 3 squares per row
          renderItem={({ item }) => (
            <PlanTile plan={item} onPress={handlePlanPress} />
          )}
          contentContainerStyle={styles.calendarGrid}
        />
      ) : (
        <Text style={styles.noPlansText}>No plans available</Text>
      )}

      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() =>
          navigation.navigate("PlanFlow", {
            screen: "CreatePlan",
          })
        }
      >
        <Text style={styles.buttonText}>Create Plan!</Text>
      </TouchableOpacity>
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
  },
  calendarGrid: {
    alignItems: "center",
  },
  bannerButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  noPlansText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});
