import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const EmptyList = () => {
  return (
    <View
      style={{
        height: hp("80%"),
      }}
      className="flex-1 justify-center items-center"
    >
      <MaterialIcons
        name="format-list-bulleted-add"
        color="#81b7f8ff"
        size={60}
      />
      <Text className="text-lg mt-2 text-blue-400">
        Nothing is listed under this category
      </Text>
    </View>
  );
};

export default EmptyList;
