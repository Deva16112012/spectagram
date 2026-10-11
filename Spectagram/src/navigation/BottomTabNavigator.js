import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ee8249",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#151515",
          borderTopWidth: 0,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6
        },
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ focused, color }) => {
          let iconName = "help-outline";
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={RFValue(25)} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="CreatePost" component={CreatePost} options={{ title: "Create Post" }} />
    </Tab.Navigator>
  );
}
