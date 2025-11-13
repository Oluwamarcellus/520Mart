import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { profileMenus } from "../../../constants/images";
import useAuthStore from "../../../hooks/firebaseAuthentication";
import useUserStore from "../../../hooks/userStore";

const profile = () => {
  const { signOut } = useAuthStore();
  const userProfile = useUserStore((state) => state.userProfile);
  const router = useRouter();

  const buttonActions = {
    "Sign out": signOut,
    "My products": () => router.push("/my-products"),
    Explore: () => router.replace("/(explore)/explore"),
    Online: () => {},
  };
  return (
    <SafeAreaView className="flex-1 mt-10 items-center px-8">
      <View className="justify-center items-center">
        <Image
          source={{
            uri: userProfile?.profile_image,
          }}
          style={{ width: wp("25%"), height: wp("25%"), borderRadius: 100 }}
        />
        <Text style={{ fontSize: wp("5.5%"), fontWeight: 500, marginTop: 10 }}>
          {userProfile?.full_name}
        </Text>
        <Text style={{ fontSize: wp("4.2%"), marginTop: 5, color: "gray" }}>
          {userProfile?.email}
        </Text>
      </View>

      <FlatList
        data={profileMenus}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10, marginTop: 20 }}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => buttonActions[item.name]()}
            style={[
              {
                width: index === profileMenus.length - 1 ? "100%" : wp("27%"),
                height: wp("27%"),
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: "#bfdbfe",
                backgroundColor: "#eff6ff",
                justifyContent: "center",
                alignItems: "center",
                alignSelf:
                  index === profileMenus.length - 1 ? "center" : "auto",
              },
            ]}
          >
            <Image
              source={item.uri}
              resizeMode="contain"
              style={{
                width: wp("10%"),
                height: wp("10%"),
                marginBottom: 8,
              }}
            />
            <Text
              style={{
                fontSize: wp("3.6%"),
                textAlign: "center",
                flexWrap: "wrap",
                color: "#rgba(0,0,0,0.5)",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

export default profile;
