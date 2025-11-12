import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CategoryCard = ({ categoryItem }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/category",
          params: { category: categoryItem.name },
        })
      }
      activeOpacity={0.4}
      style={{
        flex: 1,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      className="gap-2 bg-blue-50 rounded-lg border border-blue-200"
    >
      <Image
        source={categoryItem.uri}
        style={{
          width: wp("8%"),
          height: wp("8%"),
        }}
      />
      <Text className="text-black/60">{categoryItem.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
