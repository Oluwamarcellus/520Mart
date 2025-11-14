import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import usePostStore from "../hooks/postStore";
import useUserStore from "../hooks/userStore";

const card_detail = ({ item }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const { userProfile } = useUserStore();
  const deletePost = usePostStore((state) => state.deletePost);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  // Function that handkes posts delete
  const handleDelete = (postId, posterId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deletePost(postId, posterId);
              router.back();
            } catch (error) {
              console.error("Deleting post Error:", error);
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Funtion that handles email message to a poster
  const sendMessage = async (posterEmail, productName) => {
    try {
      if (!posterEmail)
        return Alert.alert("", "No email account found for this seller.");

      const subject = `Inquiry about ${productName}`;
      const body = `Hi,\n\nIs your ${productName} still available?\n\nAlso, are you open to negotiation?\n\nLooking forward to your reply.\n\nThank you!`;

      const emailUrl = `mailto:${posterEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Check if device can open the email app
      const canOpen = await Linking.canOpenURL(emailUrl);
      if (!canOpen)
        return Alert.alert(
          "",
          "Your device does not have an email app installed or enabled."
        );

      await Linking.openURL(emailUrl);
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="flex-1">
        {/* Card Image */}
        <View>
          <Image
            source={{ uri: item.photo_url }}
            style={{
              width: wp("100%"),
              height: wp("90%"),
              resizeMode: "cover",
            }}
          />
        </View>

        {/* Card Info */}
        <View className="px-6 pt-6">
          <View>
            <Text style={{ fontSize: wp("5.2%") }} className="font-medium">
              {item.title}
            </Text>
          </View>
          <View className="self-start mt-2 px-2 py-1 rounded-full bg-blue-400">
            <Text
              style={{
                fontSize: wp("3.6%"),
              }}
              className="text-white"
            >
              {item.category}
            </Text>
          </View>

          <View className="mt-4">
            <Text
              style={{
                fontSize: wp("4.8%"),
              }}
              className="font-medium"
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: wp("4%"),
              }}
              className="text-black/50 mt-1"
            >
              {item.description}
            </Text>
          </View>
        </View>
      </View>

      {/* Poster Info */}
      <View
        style={{ marginBottom: tabBarHeight + hp("3%") }}
        className="mt-4 px-6"
      >
        <View className="w-full bg-blue-200 px-4 py-6 rounded-2xl">
          <View className="flex-row gap-4 items-center">
            <Image
              source={{ uri: item.photo_url }}
              style={{
                height: wp("12%"),
                width: wp("12%"),
                resizeMode: "cover",
                borderRadius: 100,
              }}
            />
            <View className="">
              <Text
                style={{
                  fontSize: wp("4.5%"),
                  fontWeight: 500,
                }}
              >
                Yowale 520
              </Text>
              <Text
                style={{
                  fontSize: wp("3.8%"),
                }}
                className="text-black/50"
              >
                joboy@gmail.com
              </Text>
            </View>
          </View>

          {/* Verify it is the poster to decide action */}
          {userProfile.uid === item.poster_id ? (
            <View>
              <TouchableOpacity
                className="items-center mt-2"
                onPress={() => handleDelete(item.id, userProfile.uid)}
                disabled={deleting}
              >
                <View
                  className={`${
                    deleting && "opacity-70"
                  } bg-red-500 p-4 rounded-2xl w-[40%] items-center`}
                >
                  {deleting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      style={{
                        fontSize: wp("4%"),
                        fontWeight: 500,
                      }}
                      className="text-white py-1"
                    >
                      Remove Listing
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="items-center mt-2"
              onPress={() => sendMessage(item.poster_email || null, item.title)}
            >
              <View className="bg-blue-400 p-4 rounded-2xl w-[40%] items-center ">
                <Text
                  style={{
                    fontSize: wp("4%"),
                    fontWeight: 500,
                  }}
                  className="text-white py-1"
                >
                  Send Message
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default card_detail;
