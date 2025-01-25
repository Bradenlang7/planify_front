import React, { useState, useCallback, useEffect, useContext } from "react";
import { useApprovedPlans } from "../hooks/useApprovedPlans";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlanList from "../components/PlanList";

export default function DashboardScreen() {
  const navigation = useNavigation();

  const { data: approvedPlans = [] } = useApprovedPlans(); // fetch users plans from the

  const handlePlanPress = (plan) => {
    navigation.navigate("PlanFlow", {
      screen: "PlanDetails",
      params: { planId: plan.id },
    });
  };

  return (
    <View style={styles.container}>
      <PlanList
        headerText={"Upcoming Plans"}
        planArray={approvedPlans}
        handlePlanPress={handlePlanPress}
      />

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
});
