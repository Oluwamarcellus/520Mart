import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import LatestItems from "../../components/LatestItems";
// import { categoryMenus, flyers } from "../../constants/images";
import useUserStore from "../../hooks/userStore";

const Home = () => {
  const { userProfile } = useUserStore();

  return (
    <SafeAreaView className="flex-1 px-6 " edges={["top"]}>
      <Header user={userProfile} />
      {/* <Flyers flyerItems={flyers} />
        <Categories categoryItems={categoryMenus} /> */}
      <LatestItems />
    </SafeAreaView>
  );
};

export default Home;
