import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ItemsCard from "../../../components/ItemsCard";
import usePostStore from "../../../hooks/postStore";

const explore = () => {
  const [postData, setPostData] = useState([]);
  const [exploreQuery, setExploreQuery] = useState([]);
  // const [canLoadMore, setCanLoadMore] = useState(true);
  // const [loadingMore, setLoadingMore] = useState(false);
  // const [lastPost, setLastPost] = useState(null);
  const inputRef = useRef();
  const tabBarHeight = useBottomTabBarHeight();
  const { isFetching, fetchMore, fetchPost, refreshing, setRefreshing } =
    usePostStore();
  const params = useLocalSearchParams();

  // Fetch DATA on entry
  useEffect(() => {
    if (params?.search) setExploreQuery(params.search);
    populateData();
  }, [params?.search]);

  // Post Display Limit control
  const POST_LIMIT = 6;

  // Fetche posts from db and save it to state
  const populateData = async ({ exploreSearch = false } = {}) => {
    const { posts, lastDoc } = await fetchPost({
      searchQuery: exploreSearch
        ? exploreQuery
        : params?.search.toLowerCase() || null,
    });
    setPostData(posts);
    console.log(posts);

    // setLastPost(lastDoc);
  };

  // Handles pull down to refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    setExploreQuery("");
    const { posts, lastDoc } = await fetchPost();
    setPostData(posts);
    // setLastPost(lastDoc);
  };

  // Handles load more when list end is reaced
  // const handleLoadMore = async () => {
  //   if (!canLoadMore || isFetching || loadingMore || !lastPost) return;

  //   if (postData.length < POST_LIMIT) {
  //     setCanLoadMore(false);
  //     return;
  //   }
  //   setLoadingMore(true);
  //   try {
  //     const { posts, lastDoc } = await fetchMore(POST_LIMIT, lastPost);
  //     setPostData((prev) => [...prev, ...posts]);
  //     setLastPost(lastDoc);
  //     if (posts.length < POST_LIMIT) setCanLoadMore(false);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoadingMore(false);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 px-6 py-2">
      {/* Header */}
      <View className="pb-2">
        <Text
          style={{
            fontSize: wp("6%"),
          }}
          className="font-medium"
        >
          Explore More
        </Text>
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
            returnKeyType="search"
            value={exploreQuery}
            onChangeText={setExploreQuery}
            onSubmitEditing={() => populateData({ exploreSearch: true })}
          />
        </View>
      </View>

      {/* Content */}
      {isFetching && postData.length === 0 ? (
        // Shows spinner when screen is loading data
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="small" color="#3ba8f6ff" />
        </View>
      ) : (
        <FlatList
          data={postData}
          renderItem={({ item }) => (
            <ItemsCard item={item} currentScreen={"(explore)"} />
          )}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            gap: 8,
          }}
          contentContainerStyle={{
            gap: 8,
            paddingBottom: tabBarHeight,
            marginTop: 10,
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.1}
          // ListFooterComponent={
          //   isFetching && postData ? (
          //     <ActivityIndicator style={{ marginVertical: 20 }} />
          //   ) : !canLoadMore ? (
          //     <Text style={{ textAlign: "center", marginVertical: 20 }}>
          //       No more posts
          //     </Text>
          //   ) : null
          // }
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: hp("70%"),
                }}
                className="flex-1 justify-center items-center"
              >
                <MaterialIcons
                  name="format-list-bulleted-add"
                  color="#81b7f8ff"
                  size={60}
                />
                <Text className="text-lg mt-2 text-blue-400">
                  No item matched your search
                </Text>
                <TouchableOpacity onPress={() => handleRefresh()}>
                  <Text className="text-white bg-blue-400 py-2 px-4 mt-1 rounded-2xl">
                    Browse all
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default explore;
