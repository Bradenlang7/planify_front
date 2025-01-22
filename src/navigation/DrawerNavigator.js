import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native";
import DashboardScreen from "../screens/DashBoardScreen";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import PlanDetailsScreen from "../screens/PlanDetailsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import AccountScreen from "../screens/AccountScreen";
import AddInviteesScreen from "../screens/AddInviteesScreen";

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
        //swipeEdgeWidth: route.name === "PlanFlow" ? 0 : 30,
      })}
    >
      {/* DashboardFlow */}
      <Drawer.Screen
        name="DashboardFlow"
        component={DashboardFlow}
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault(); // Prevent default drawer behavior
            navigation.dispatch(
              CommonActions.reset({
                index: 0, // Reset stack to the first screen
                routes: [{ name: "DashboardFlow" }],
              })
            );
          },
        })}
      />

      {/* Other drawer screens */}
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}
