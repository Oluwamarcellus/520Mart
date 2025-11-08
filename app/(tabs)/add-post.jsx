import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSelect from "../../components/CategoryItemsModal";
import { db } from "../../config/firebase.config";

const addPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [postIsUploading, setPostIsUploading] = useState(false);

  // Selecting Image from the device
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageData = result.assets[0];
      setImageFile({
        uri: imageData.uri,
        name: `image_${Date.now()}.jpg`,
        type: imageData.mimeType,
      });
    }
  };

  // Uploads a local media to Cloudinary and returns the url
  const uploadImageForURL = async () => {
    try {
      const data = new FormData();
      data.append("file", {
        uri: imageFile.uri,
        type: imageFile.type,
        name: imageFile.name,
      });
      data.append(
        "upload_preset",
        process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME);

      const upload = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const json = await upload.json();
      return json.url;
    } catch (error) {
      console.error("Upload Failed", error);
      return null;
    } finally {
      setImageIsUploading(false);
    }
  };

  const handleAddPost = async () => {
    // Check if all fields are filled correclty

    if (!title.trim() || !description.trim() || !price || !address.trim()) {
      setError("All fields are required!");
      return;
    } else if (price <= 0) {
      setError("Set a valid price!");
      return;
    } else if (!selected) {
      setError("Select a category!");
      return;
    } else if (!imageFile) {
      setError("Upload an Image");
      return;
    }

    try {
      setError(null);
      setPostIsUploading(true);
      setImageIsUploading(true);
      const url = await uploadImageForURL();

      if (!url) {
        setPostIsUploading(false);
        return setError("Image upload failed");
      }

      // Save Post to Firestore
      const postData = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        address: address.trim(),
        photo_url: url,
        category: selected,
        created_at: serverTimestamp(),
      };
      // console.log(postData);

      const postRef = collection(db, "posts");
      await addDoc(postRef, postData);
      Alert.alert("Success", "Post uploaded successfully");
      setTitle("");
      setDescription("");
      setPrice(null);
      setAddress("");
      setSelected(null);
      setImageFile(null);

      console.log("Post Uploaded Successfully");
    } catch (error) {
      console.log(error);
      setError("Post upload failed");
    } finally {
      setPostIsUploading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-8 mt-2" edges={["top"]}>
      <View className="gap-1">
        <Text
          style={{
            fontSize: wp("6%"),
          }}
          className="font-medium"
        >
          Add New Post
        </Text>
        <Text
          style={{
            fontSize: wp("4.5%"),
          }}
          className="text-gray-600 font-light"
        >
          Create a new post and start selling
        </Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1  mt-6">
          <TouchableOpacity
            onPress={pickImage}
            disabled={imageIsUploading || postIsUploading}
            activeOpacity={0.5}
            style={{
              width: wp("22%"),
              height: wp("22%"),
            }}
            className={`rounded-3xl overflow-hidden justify-center items-center ${
              !imageFile && "bg-blue-50 border-2 border-blue-200"
            }`}
          >
            {imageFile ? (
              <View className="flex-1 justify-center items-center relative">
                <Image
                  source={{ uri: imageFile.uri }}
                  style={{
                    flex: 1,
                    width: wp("22%"),
                    height: wp("22%"),
                    resizeMode: "cover",
                  }}
                />
                <Text className="absolute left-0 right-0 bottom-0 w-full text-center text-sm px-2 bg-blue-50">
                  {imageIsUploading ? "Uploading..." : "Change Image"}
                </Text>
              </View>
            ) : (
              <View
                style={{}}
                className="flex-1 justify-center items-center gap-2"
              >
                <Ionicons
                  name="duplicate-outline"
                  size={wp("5.5%")}
                  color="#a9cdfaff"
                />
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  Add Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {/* Title Input */}
          <View className="bg-blue-50 mt-2 rounded-2xl px-4 py-4 border-2 border-blue-200">
            <TextInput
              style={{ fontSize: wp("4.5%") }}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={"gray"}
              className="text-black/70"
            />
          </View>
          {/* Description Input */}
          <View
            style={{
              height: hp("15%"),
            }}
            className="bg-blue-50 mt-2 rounded-2xl px-4 py-4 border-2 border-blue-200"
          >
            <TextInput
              style={{ fontSize: wp("4.5%"), flex: 1 }}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={"gray"}
              className="text-black/70"
              multiline={true}
            />
          </View>

          {/* Price Input */}
          <View className="bg-blue-50 mt-2 rounded-2xl px-4 py-4 border-2 border-blue-200">
            <TextInput
              style={{ fontSize: wp("4.5%") }}
              placeholder="Price($)"
              value={price}
              onChangeText={setPrice}
              placeholderTextColor={"gray"}
              className="text-black/70"
              keyboardType="numeric"
            />
          </View>

          {/* Address Input */}
          <View className="bg-blue-50 mt-2 rounded-2xl px-4 py-4 border-2 border-blue-200">
            <TextInput
              style={{ fontSize: wp("4.5%") }}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              placeholderTextColor={"gray"}
              className="text-black/70"
            />
          </View>

          {/* Category Select */}
          <CustomSelect selected={selected} setSelected={setSelected} />

          {/* Error Output */}
          {error && (
            <View className="mt-2 px-2">
              <Text
                className="text-red-600 text-left"
                style={{
                  fontSize: wp("3.6%"),
                }}
              >
                {error}
              </Text>
            </View>
          )}

          {/* Post Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={postIsUploading}
            onPress={handleAddPost}
            style={{
              padding: hp("1.5%"),
              marginTop: hp("4%"),
            }}
            className={
              postIsUploading
                ? " bg-blue-400/70 rounded-full"
                : " bg-blue-400 rounded-full"
            }
          >
            {postIsUploading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white text-center text-lg">Add Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default addPost;
