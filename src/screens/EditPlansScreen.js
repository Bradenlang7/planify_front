import React, { useState, useContext } from "react";
import { useApprovedPlans } from "../hooks/useApprovedPlans";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PlanList from "../components/PlanList";
import { Context as UserContext } from "../context/UserContext";

export default function EditPlansScreen() {
  const navigation = useNavigation();
  const [showOwnedPlans, setShowOwnedPlans] = useState(true);
  const { data: approvedPlans } = useApprovedPlans();
  const { state } = useContext(UserContext);
  const userName = state.userName;
  const headerText = showOwnedPlans ? "Owned Plans" : "Approved Plans";
  const buttonText = showOwnedPlans
    ? "Edit Approved Plans"
    : "Edit Owned Plans";

  const filteredArray = approvedPlans.filter((item) => {
    return showOwnedPlans //showOwnedPlans == true will show only approved plans where the user is the OWNER. False shows approved plans where the user is NOT the owner.
      ? item.creatorUserName === userName
      : item.creatorUserName !== userName;
  });

  console.log(filteredArray);

  const handlePlanPress = (plan) => {
    navigation.navigate("PlanFlow", {
      screen: "EditSinglePlanScreen",
      params: { planId: plan.id },
    });
  };

  return (
    <View style={styles.container}>
      <PlanList
        headerText={headerText}
        planArray={filteredArray}
        handlePlanPress={handlePlanPress}
      />
      <Button
        style={styles.button}
        title={buttonText}
        onPress={() => setShowOwnedPlans((prev) => !prev)}
      />
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
  button: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
});
