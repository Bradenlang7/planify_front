import React from "react";
import EditSinglePlanScreen from "../screens/EditSinglePlanScreen";
import PlanDetailsScreen from "../screens/PlanDetailsScreen";
import AddInviteesScreen from "../screens/AddInviteesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function PlanFlow() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="PlanDetails">
      <Stack.Screen
        name="PlanDetails"
        component={PlanDetailsScreen}
        options={{
          title: "Plan Details",
          headerShown: false,
          gestureEnabled: true, // Enable swipe-back gestures
        }}
      />
      <Stack.Screen
        name="EditSinglePlanScreen"
        component={EditSinglePlanScreen}
        options={{
          title: "Create Plan",
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="AddInvitees"
        component={AddInviteesScreen}
        options={{
          title: "Add Invitees",
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default PlanFlow;
