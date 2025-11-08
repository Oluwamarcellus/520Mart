import { Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const ItemsCard = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        width: wp("44%"),
        padding: 8,
      }}
      className="rounded-xl overflow-hidden bg-blue-50 border border-blue-200 gap-3"
    >
      <View className="rounded-xl overflow-hidden">
        <Image
          source={{ uri: item.image }}
          style={{
            width: wp("44%") - 16, // 16 is padding... 8 + 8 for x, 8 + 8 for y
            aspectRatio: 1,
            resizeMode: "cover",
          }}
        />
      </View>
      <View className="flex-1 justify-between gap-2">
        <Text
          style={{
            fontSize: wp("3.8%"),
          }}
          className="text-black/60 leading-5"
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: wp("4.5%"),
          }}
          className="text-blue-500"
        >
          ${item.price}
        </Text>
      </View>

      <View className="self-start px-2 py-1 rounded-full bg-blue-400">
        <Text
          style={{
            fontSize: wp("3.2%"),
          }}
          className="text-white"
        >
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemsCard;
