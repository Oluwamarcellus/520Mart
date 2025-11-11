import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const card_detail = () => {
  const params = useLocalSearchParams();

  return (
    <View>
      <Text>{params.item.title}</Text>
    </View>
  );
};

export default card_detail;
