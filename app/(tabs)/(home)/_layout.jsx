import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="card_detail"
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#60a5fa",
          },
          headerTitle: "",
          headerLeft: () => {
            return (
              <View className="flex-row justify-center items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>
                <Text style={{ color: "white", fontSize: wp("5%") }}>
                  Item Info
                </Text>
              </View>
            );
          },
        })}
      />
      <Stack.Screen
        name="category"
        options={({ route, navigation }) => ({
          headerStyle: {
            backgroundColor: "#60a5fa",
          },
          headerTitle: "",
          headerLeft: () => {
            return (
              <View className="flex-row justify-center items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>
                <Text style={{ color: "white", fontSize: wp("5%") }}>
                  {route.params?.category || "Category"}
                </Text>
              </View>
            );
          },
        })}
      />
    </Stack>
  );
};

export default _layout;
