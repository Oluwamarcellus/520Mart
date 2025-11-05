import { Button, Text, View } from "react-native";
import useAuthStore from "../../hooks/firebaseAuthentication";

const Home = () => {
  const { signOut } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

export default Home;
