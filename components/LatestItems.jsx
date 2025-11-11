import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLayoutEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { categoryMenus, flyers } from "../constants/images";
import usePostStore from "../hooks/postStore";
import Categories from "./Categories";
import Flyers from "./Flyers";
import ItemsCard from "./ItemsCard";

const LatestItems = () => {
  const [postData, setPostData] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();
  const POST_LIMIT = 10;
  const { fetchPost, refreshing, setRefreshing } = usePostStore();

  useLayoutEffect(() => {
    populateData();
  }, []);

  // Fetche posts from db and save it to state
  const populateData = async () => {
    const { posts } = await fetchPost(POST_LIMIT);
    setPostData(posts);
  };

  // Handles pull down to refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    const { posts, lastDoc } = await fetchPost();
    setPostData(posts);
    // setLastPost(lastDoc);
  };

  return (
    <FlatList
      data={postData}
      renderItem={({ item }) => <ItemsCard item={item} />}
      keyExtractor={(item) => String(item.title)}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
        gap: 8,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        gap: 8,
        paddingBottom: tabBarHeight + 25,
      }}
      ListHeaderComponent={() => (
        <View>
          <Flyers flyerItems={flyers} />
          <Categories categoryItems={categoryMenus} />
          <Text
            style={{
              fontSize: wp("5.2%"),
              marginTop: 5,
            }}
            className=" font-medium"
          >
            Latest Items
          </Text>
        </View>
      )}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

export default LatestItems;
