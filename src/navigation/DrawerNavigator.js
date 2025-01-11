import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Correct import
import DashboardScreen from "../screens/DashBoardScreen";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import FriendsScreen from "../screens/FriendsScreen";
import AccountScreen from "../screens/AccountScreen";
import PlanDetailsScreen from "../screens/PlanDetailsScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DashboardFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlanDetails"
        component={PlanDetailsScreen}
        options={{ title: "Plan Details", headerShown: false }}
      />
      <Stack.Screen
        name="CreatePlan"
        component={CreatePlanScreen}
        options={{ title: "Create Plan" }}
      />
    </Stack.Navigator>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="DashboardFlow"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="DashboardFlow"
        component={DashboardFlow}
        options={{ title: "Dashboard", headerTitle: "" }}
      />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}
