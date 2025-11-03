import { Image, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { login } from "../constants/images";

const GetStarted = () => {
  return (
    <View>
      <Image source={login} style={{ width: wp("100%"), height: 200 }} />
      <Text className="text-2xl font-bold">Setups</Text>
    </View>
  );
};

export default GetStarted;
