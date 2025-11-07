import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "../../components/Categories";
import Flyers from "../../components/Flyers";
import Header from "../../components/Header";
import { categoryMenus, flyers } from "../../constants/images";
import useUserStore from "../../hooks/userStore";

const Home = () => {
  const { userProfile } = useUserStore();

  return (
    <SafeAreaView className="flex-1 justify-start px-6 " edges={["top"]}>
      <Header user={userProfile} />
      <ScrollView>
        <Flyers flyerItems={flyers} />
        <Categories categoryItems={categoryMenus} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
