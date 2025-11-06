import { Image, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const FlyerCard = ({ data, isLastCard }) => {
  return (
    <TouchableOpacity
      className={`rounded-2xl overflow-hidden ${!isLastCard && "mr-4"}`}
      activeOpacity={0.8}
    >
      <Image
        style={{
          width: wp("80%"),
          height: wp("100%") / 2.25,
          resizeMode: "cover",
        }}
        source={data}
      />
    </TouchableOpacity>
  );
};

export default FlyerCard;
