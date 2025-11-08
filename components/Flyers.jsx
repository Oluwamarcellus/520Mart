import { FlatList } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FlyerCard from "./FlyerCard";

const Flyers = ({ flyerItems }) => {
  return (
    <FlatList
      data={flyerItems}
      renderItem={({ item, index }) => (
        <FlyerCard data={item} isLastCard={index === flyerItems.length - 1} />
      )}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginVertical: 10 }}
      // pagingEnabled={true}
      // These options help with the snap to alignment
      snapToInterval={wp("82%")}
      snapToAlignment="start"
      decelerationRate={"fast"}
    />
  );
};

export default Flyers;
