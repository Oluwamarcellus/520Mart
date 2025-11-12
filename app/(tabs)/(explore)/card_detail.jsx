import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import CardDetailCard from "../../../components/CardDetailCard";

const card_detail = () => {
  const params = useLocalSearchParams();
  const cardInfo = JSON.parse(params.item);
  return (
    <View className="flex-1 ">
      <CardDetailCard item={cardInfo} />
    </View>
  );
};

export default card_detail;
