import React, { useState, useCallback } from "react";
import planifyApi from "../api/planify";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import PlanTile from "../components/PlanTile";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function DashboardScreen() {
  const navigation = useNavigation();

  const [plans, setPlans] = useState([]);
  console.log(plans);

  useFocusEffect(
    useCallback(() => {
      const fetchAllApprovedPlans = async () => {
        try {
          const status = "APPROVED";
          const includeOwner = true;

          const response = await planifyApi.get(
            `/api/approvals/users/status/${status}`,
            {
              params: {
                includeOwner, // Required by the backend endpoint
              },
            }
          );

          setPlans(response.data);
        } catch (err) {
          console.error("Error fetching plans:", err);
        }
      };

      fetchAllApprovedPlans();
    }, [])
  );

  const handlePlanPress = (plan) => {
    navigation.navigate("PlanDetails", { planId: plan.id }); // Navigate to plan details
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {plans.length > 0 ? (
        <FlatList
          data={plans}
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
        onPress={() => navigation.navigate("CreatePlan")}
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
    backgroundColor: "#007BFF", // Button background color
    paddingVertical: 16, // Button height
    alignItems: "center", // Center text horizontally
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF", // Text color
    fontSize: 18, // Text size
    fontWeight: "bold", // Text weight
  },
  noPlansText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});
