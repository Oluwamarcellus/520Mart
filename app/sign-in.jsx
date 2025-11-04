import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { authScreenImage } from "../constants/images";

const SignIn = () => {
  const router = useRouter();
  const psswdRef = useRef();

  const handleLogin = () => {};

  return (
    <ScrollView
      style={{
        paddingTop: wp("10%"),
        backgroundColor: "#60a5fa",
      }}
      contentContainerStyle={{ alignItems: "center", flex: 1 }}
    >
      <StatusBar value="auto" />
      <Image
        source={authScreenImage}
        style={{
          width: wp("90%"),
          height: hp("40%"),
          resizeMode: "contain",
        }}
      />

      {/* -------- */}
      <View
        style={{
          paddingTop: wp("3%"),
          paddingHorizontal: wp("10%"),
          alignItems: "center",
          width: wp("100%"),
          flex: 1,

          backgroundColor: "#fff",
        }}
        className="gap-4 rounded-t-3xl"
      >
        <Text
          style={{
            fontSize: wp("6.5%"),
          }}
          className="text-black text-center pt-2 font-semibold "
        >
          SIGN IN
        </Text>
        <View
          style={{
            width: wp("70%"),
            backgroundColor: "#e7f0f06a",
          }}
          className="w-full border-2 rounded-3xl py-3 px-6 border-blue-400"
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={"#aea7a7ff"}
            className="text-black/70 text-xl"
            returnKeyType="next"
            onSubmitEditing={() => psswdRef.current.focus()}
          />
        </View>
        <View
          style={{
            width: wp("70%"),
            backgroundColor: "#e7f0f06a",
          }}
          className="w-full border-2 rounded-3xl py-3 px-6 border-blue-400"
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#aea7a7ff"}
            className="text-black/70 text-xl"
            returnKeyType="go"
            ref={psswdRef}
            onSubmitEditing={handleLogin}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.7}
          style={{
            padding: hp("1.3%"),
            width: wp("70%"),
          }}
          className=" bg-blue-400 rounded-full"
        >
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>
        <View className="pt-2 flex-row justify-center items-center">
          <Text
            style={{
              fontSize: wp("4%"),
            }}
            className="text-gray-500/80"
          >
            Dont have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("sign-up")}>
            <Text className="text-blue-600">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
