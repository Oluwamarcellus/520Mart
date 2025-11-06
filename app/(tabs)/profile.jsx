import { Button, Text, View } from "react-native";
import useAuthStore from "../../hooks/firebaseAuthentication";

const profile = () => {
  const { signOut } = useAuthStore();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Home</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

export default profile;
