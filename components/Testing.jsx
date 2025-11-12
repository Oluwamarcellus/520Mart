import { Text, TouchableOpacity } from "react-native";
import usePostStore from "../hooks/postStore";

const Testing = () => {
  const { fetchPost } = usePostStore();

  return (
    <TouchableOpacity
      onPress={async () => {
        const { posts, lastDoc } = await fetchPost({ searchQuery: "Chess" });
        console.log(posts);
      }}
    >
      <Text>Testing</Text>
    </TouchableOpacity>
  );
};

export default Testing;
