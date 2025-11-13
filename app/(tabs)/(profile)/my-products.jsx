import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import EmptyList from "../../../components/EmptyList";
import ItemsCard from "../../../components/ItemsCard";
import usePostStore from "../../../hooks/postStore";
import useUserStore from "../../../hooks/userStore";

const my_products = () => {
  const [myProducts, setMyProducts] = useState(null);
  const { refreshing, setRefreshing, fetchPost } = usePostStore();
  const tabBarHeight = useBottomTabBarHeight();
  const userProfile = useUserStore((state) => state.userProfile);

  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    const { posts, lastDoc } = await fetchPost({ posterId: userProfile?.uid });
    setMyProducts(posts);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const { posts, lastDoc } = await fetchPost({ posterId: userProfile?.uid });
    setMyProducts(posts);
    // setLastPost(lastDoc);
  };

  if (!myProducts)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color="#3ba8f6ff" />
      </View>
    );

  return (
    <View className="flex-1 px-6 py-2">
      <FlatList
        data={myProducts}
        renderItem={({ item }) => (
          <ItemsCard item={item} currentScreen={"(profile)"} />
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

export default my_products;
