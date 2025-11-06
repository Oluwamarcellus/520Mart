import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlyerCard from "../../components/FlyerCard";
import Header from "../../components/Header";
import { flyers } from "../../constants/images";
import useUserStore from "../../hooks/userStore";

const Home = () => {
  const { userProfile } = useUserStore();

  useEffect(() => {
    const data = async () => await AsyncStorage.getItem("userProfile");
    console.log(data);
  }, []);
  return (
    <SafeAreaView className="flex-1 justify-start px-6 " edges={["top"]}>
      <Header user={userProfile} />
      <ScrollView>
        <FlatList
          data={flyers}
          renderItem={({ item, index }) => (
            <FlyerCard data={item} isLastCard={index === flyers.length - 1} />
          )}
          horizontal
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
