import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import EmptyList from "../../../components/EmptyList";
import ItemsCard from "../../../components/ItemsCard";
import usePostStore from "../../../hooks/postStore";

const category = () => {
  const [categoryItems, setCategoryItems] = useState(null);
  const params = useLocalSearchParams();
  const { refreshing, setRefreshing, fetchPost } = usePostStore();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    const { posts, lastDoc } = await fetchPost({ category: params.category });
    setCategoryItems(posts);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const { posts, lastDoc } = await fetchPost({ category: params.category });
    setCategoryItems(posts);
    // setLastPost(lastDoc);
  };

  if (!categoryItems)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color="#3ba8f6ff" />
      </View>
    );

  return (
    <View className="flex-1 px-6 py-2">
      <FlatList
        data={categoryItems}
        renderItem={({ item }) => (
          <ItemsCard item={item} currentScreen={"(home)"} />
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
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
};

export default category;
