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
        alignItems: "center",
      }}
    >
      <StatusBar value="auto" />
      <Image
        source={login}
        style={{
          width: wp("90%"),
          height: hp("40%"),
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          paddingTop: wp("6%"),
          paddingHorizontal: wp("10%"),
          alignItems: "center",
        }}
        className="gap-4 flex-1 rounded-t-3xl"
      >
        <Text
          style={{
            fontSize: wp("6.5%"),
          }}
          className="text-black text-center font-semibold "
        >
          520 Marketplace
        </Text>
        <Text
          style={{
            fontSize: wp("4.5%"),
          }}
          className="text-center leading-5 pb-6 text-gray-500/80"
        >
          Your go-to platform to buy, sell, or swap new and pre-owned items
          effortlessly
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            padding: hp("1.3%"),
            width: wp("70%"),
          }}
          className=" bg-blue-400 rounded-full"
        >
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            padding: hp("1.3%"),
            width: wp("70%"),
          }}
          className=" bg-blue-400 rounded-full"
        >
          <Text className="text-white text-center text-lg">Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            padding: hp("1.3%"),
            width: wp("70%"),
          }}
          className="flex-row gap-2 items-center justify-center rounded-full bg-gray-200 border border-gray-400/40"
        >
          <Image
            style={{
              height: hp("2%"),
              width: hp("2%"),
              resizeMode: "contain",
            }}
            source={require("../assets/googleIcon.jpg")}
          />
          <Text className="text-black text-lg">Continue with google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;
