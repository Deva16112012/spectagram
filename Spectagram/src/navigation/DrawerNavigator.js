import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerActiveTintColor: "#ee8249",
        drawerInactiveTintColor: "#999",
        drawerStyle: { backgroundColor: "#111" },
        drawerIcon: ({ focused, color, size }) => {
          const name = route.name === "Home"
            ? focused ? "home" : "home-outline"
            : focused ? "person" : "person-outline";
          return <Ionicons name={name} size={size} color={color} />;
        }
      })}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
