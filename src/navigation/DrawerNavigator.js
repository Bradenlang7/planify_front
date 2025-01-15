import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonActions } from "@react-navigation/native"; // Import CommonActions
import DashboardScreen from "../screens/DashBoardScreen";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import PlanDetailsScreen from "../screens/PlanDetailsScreen";
import FriendsScreen from "../screens/FriendsScreen";
import AccountScreen from "../screens/AccountScreen";
import AddInviteesScreen from "../screens/AddInviteesScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function PlanFlow() {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="AddInvitees"
        component={AddInviteesScreen}
        options={{ title: "Add Invitees" }}
      />
    </Stack.Navigator>
  );
}

function DashboardFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlanFlow"
        component={PlanFlow}
        options={{ title: "Plan Details", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function DrawerNavigator({ navigation }) {
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
        options={{
          title: "Dashboard",
          drawerLabel: "Dashboard",
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault(); // Prevent default drawer behavior
            navigation.dispatch(
              CommonActions.reset({
                //Reset navigation stack so users cannot navigate back to the previous screen
                index: 0, // Reset to the first screen
                routes: [{ name: "DashboardFlow" }], //ensures when the dashboard is pressed it returns the user to DashBoard screen
              })
            );
          },
        })}
      />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}
