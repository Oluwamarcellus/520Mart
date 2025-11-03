import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { login } from "../constants/images";

const GetStarted = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: wp("10%"),
      }}
    >
      <StatusBar value="auto" />
      <Image
        source={login}
        style={{
          width: wp("100%"),
          height: hp("45%"),
          paddingVertical: 20,
        }}
      />
      <View
        style={{
          paddingTop: wp("12%"),
          paddingHorizontal: wp("10%"),
        }}
        className="gap-4 flex-1 rounded-t-3xl"
      >
        <Text
          style={{
            fontSize: wp("7%"),
          }}
          className="text-black text-center font-semibold "
        >
          520 Marketplace
        </Text>
        <Text
          style={{
            fontSize: wp("4.5%"),
          }}
          className="text-center leading-5 text-gray-500/80"
        >
          Your go-to platform to buy, sell, or swap new and pre-owned items
          effortlessly
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            fontSize: wp("7%"),
            marginTop: hp("8%"),
            padding: hp("1.8%"),
          }}
          className=" bg-blue-400 rounded-full border-2 border-blue-500/40"
        >
          <Text className="text-white text-center text-2xl">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;
