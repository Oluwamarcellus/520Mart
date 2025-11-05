import { useRouter } from "expo-router";
import { useRef, useState } from "react";
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

import { ActivityIndicator } from "react-native";
import { authScreenImage } from "../constants/images";
import useAuthStore from "../hooks/firebaseAuthentication";
import { isValidEmail, isValidPassword } from "../utils/helperFunctions";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  const { signingUp, signUp } = useAuthStore();

  const emailRef = useRef();
  const psswdRef = useRef();
  const vPsswdRef = useRef();

  const handleSignUp = async () => {
    setError(null);

    if (!password || !verifyPassword || !fullName.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const passwordError = isValidPassword(password, verifyPassword);
    if (passwordError) return setError(passwordError);

    const res = await signUp(fullName.trim(), email.trim(), password);
    if (res) setError(res);
  };

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
        bounces={false}
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
              value={fullName}
              onChangeText={setFullName}
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
              value={email}
              onChangeText={setEmail}
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
              value={password}
              onChangeText={setPassword}
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
              value={verifyPassword}
              onChangeText={setVerifyPassword}
            />
          </View>

          {error && (
            <View className="w-[85%] justify-center items-center">
              <Text className="text-red-600  text-left">{error}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSignUp}
            disabled={signingUp}
            activeOpacity={0.7}
            style={{
              padding: hp("1.3%"),
              width: wp("70%"),
            }}
            className={
              signingUp
                ? " bg-blue-400/70 rounded-full"
                : " bg-blue-400 rounded-full"
            }
          >
            {signingUp ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white text-center text-lg">Sign Up</Text>
            )}
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
