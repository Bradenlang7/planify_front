import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native";
import DashboardScreen from "../screens/DashBoardScreen";
import EditSinglePlanScreen from "../screens/EditSinglePlanScreen";
import PlanDetailsScreen from "../screens/PlanDetailsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import AccountScreen from "../screens/AccountScreen";
import EditPlansScreen from "../screens/EditPlansScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// PlanFlow: A nested stack for plan-related screens

// DashboardFlow: Includes the dashboard and PlanFlow
function DashboardFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// Main DrawerNavigator: Top-level navigation
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="DashboardFlow"
      screenOptions={({ route }) => ({
        headerShown: true,
      })}
    >
      <Drawer.Screen
        name="DashboardFlow"
        component={DashboardFlow}
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
      />

      <Drawer.Screen name="Edit Plans" component={EditPlansScreen} />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}
