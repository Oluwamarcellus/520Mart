import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Header = ({ user }) => {
  const inputRef = useRef();

  return (
    <View className="pt-2">
      <View className="flex-row items-center gap-2">
        <View>
          <Image
            source={{ uri: user?.profile_image }}
            style={{ width: wp("13%"), height: wp("13%"), borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
        <View className="gap-1">
          <Text
            style={{
              fontSize: wp("4.5%"),
            }}
            className="font-light"
          >
            Welcome
          </Text>
          <Text
            style={{
              fontSize: wp("5.2%"),
            }}
            className=" font-medium"
          >
            {user?.full_name}
          </Text>
        </View>
      </View>

      <View className="flex-row bg-blue-50 mt-4 rounded-full px-4 py-3 border-2 border-blue-200 gap-2">
        <TouchableOpacity onPress={() => inputRef.current.focus()}>
          <Ionicons name="search" size={wp("4%")} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={{ flex: 1, fontSize: 18 }}
          placeholder="Search"
          placeholderTextColor={"gray"}
          className="text-black/70"
          ref={inputRef}
        />
      </View>
    </View>
  );
};

export default Header;
