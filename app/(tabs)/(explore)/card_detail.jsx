import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import CardDetailCard from "../../../components/CardDetailCard";
import { handleShare } from "../../../utils/helperFunctions";

const card_detail = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const cardInfo = JSON.parse(params.item);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => handleShare(cardInfo)}>
            <Ionicons name="share-social" size={23} color="white" />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, cardInfo]);

  return (
    <View className="flex-1 ">
      <CardDetailCard item={cardInfo} />
    </View>
  );
};

export default card_detail;
