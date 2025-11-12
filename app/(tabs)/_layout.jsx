import { Tabs } from "expo-router";
import { Dimensions } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Layout() {
  const { width } = Dimensions.get("window");
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: wp("2.8%"), marginTop: "2%" },
        tabBarStyle: {
          position: "absolute",
          width: "90%",
          bottom: hp("2%"),
          left: "10%",
          height: hp("7.8%"),
          backgroundColor: "#e6e6e6ff",
          borderRadius: 30,
          marginLeft: width * (5 / 100),
        },
        tabBarItemStyle: {
          paddingTop: "1.5%",
        },
        tabBarActiveTintColor: "#60a5fa",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(explore)"
        title="Explore"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-post"
        title="Add Post"
        options={{
          tabBarLabel: "Add Post",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "add" : "add-outline"}
              size={size + 6}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        title="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
