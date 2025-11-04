import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
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

const SignUp = () => {
  const router = useRouter();

  const emailRef = useRef();
  const psswdRef = useRef();
  const vPsswdRef = useRef();

  const handleSignUp = () => {};

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{
          paddingTop: wp("10%"),
          backgroundColor: "#60a5fa",
        }}
        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
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
          className="gap-3 rounded-t-3xl"
        >
          <Text
            style={{
              fontSize: wp("6.5%"),
            }}
            className="text-black text-center pt-2 font-semibold "
          >
            REGISTER
          </Text>

          <View
            style={{
              width: wp("70%"),
              backgroundColor: "#e7f0f06a",
            }}
            className="w-full border-2 rounded-3xl py-3 px-6 border-blue-400"
          >
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={"#aea7a7ff"}
              className="text-black/70 text-xl"
              returnKeyType={emailRef ? "next" : "return"}
              onSubmitEditing={() => emailRef?.current.focus()}
              autoComplete="name"
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
              placeholder="Email"
              placeholderTextColor={"#aea7a7ff"}
              className="text-black/70 text-xl"
              returnKeyType={psswdRef ? "next" : "return"}
              onSubmitEditing={() => psswdRef?.current.focus()}
              keyboardType="email-address"
              autoComplete="email"
              ref={emailRef}
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
              returnKeyType={vPsswdRef ? "next" : "return"}
              secureTextEntry={true}
              ref={psswdRef}
              onSubmitEditing={() => vPsswdRef?.current?.focus()}
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
              placeholder="Verify Password"
              placeholderTextColor={"#aea7a7ff"}
              className="text-black/70 text-xl"
              returnKeyType="go"
              ref={vPsswdRef}
              onSubmitEditing={handleSignUp}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            activeOpacity={0.7}
            style={{
              padding: hp("1.3%"),
              width: wp("70%"),
            }}
            className=" bg-blue-400 rounded-full"
          >
            <Text className="text-white text-center text-lg">Sign Up</Text>
          </TouchableOpacity>

          <View className="pt-2 flex-row justify-center items-center">
            <Text
              style={{
                fontSize: wp("4%"),
              }}
              className="text-gray-500/80"
            >
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.replace("sign-in")}>
              <Text className="text-blue-600">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
