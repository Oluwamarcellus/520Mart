import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const card_detail = ({ item }) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScrollView className="flex-1">
      <View className="flex-1">
        {/* Card Image */}
        <View>
          <Image
            source={{ uri: item.photo_url }}
            style={{
              width: wp("100%"),
              height: wp("90%"),
              resizeMode: "cover",
            }}
          />
        </View>

        {/* Card Info */}
        <View className="px-6 pt-6">
          <View>
            <Text style={{ fontSize: wp("5.2%") }} className="font-medium">
              {item.title}
            </Text>
          </View>
          <View className="self-start mt-2 px-2 py-1 rounded-full bg-blue-400">
            <Text
              style={{
                fontSize: wp("3.6%"),
              }}
              className="text-white"
            >
              {item.category}
            </Text>
          </View>

          <View className="mt-4">
            <Text
              style={{
                fontSize: wp("4.8%"),
              }}
              className="font-medium"
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: wp("4%"),
              }}
              className="text-black/50 mt-1"
            >
              {item.description} {item.description} {item.description}
            </Text>
          </View>
        </View>
      </View>

      {/* Poster Info */}
      <View
        style={{ marginBottom: tabBarHeight + hp("2.5%") }}
        className="w-full mt-4 bg-blue-200 px-4 py-6"
      >
        <View className="flex-row gap-4 items-center">
          <Image
            source={{ uri: item.photo_url }}
            style={{
              height: wp("12%"),
              width: wp("12%"),
              resizeMode: "cover",
              borderRadius: 100,
            }}
          />
          <View className="">
            <Text
              style={{
                fontSize: wp("4.5%"),
                fontWeight: 500,
              }}
            >
              Yowale 520
            </Text>
            <Text
              style={{
                fontSize: wp("3.8%"),
              }}
              className="text-black/50"
            >
              joboy@gmail.com
            </Text>
          </View>
        </View>
        <TouchableOpacity className="items-center mt-2">
          <View className="bg-blue-400 p-4 rounded-2xl ">
            <Text
              style={{
                fontSize: wp("4%"),
                fontWeight: 500,
              }}
              className="text-white"
            >
              Send Message
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default card_detail;
