import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import PlanFlow from "./PlanFlow";
import DrawerNavigator from "./DrawerNavigator";
import ResolveAuthScreen from "../screens/ResolveAuthScreen";
import { navigationRef } from "../../navigationRef";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="ResolveAuthScreen">
        <Stack.Screen
          name="ResolveAuthScreen"
          component={ResolveAuthScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PlanFlow"
          component={PlanFlow}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainApp"
          component={DrawerNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
