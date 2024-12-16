import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../screens/DashBoardScreen";
import FriendsScreen from "../screens/FriendsScreen";
import AccountScreen from "../screens/AccountScreen";

const Drawer = createDrawerNavigator();

//main app nav
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />

      <Drawer.Screen name="Friends" component={FriendsScreen} />

      <Drawer.Screen name="Account" component={AccountScreen} />
    </Drawer.Navigator>
  );
}
