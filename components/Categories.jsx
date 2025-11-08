import { FlatList, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CategoryCard from "./CategoryCard";

const Categories = ({ categoryItems }) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={categoryItems}
      renderItem={({ item }) => <CategoryCard categoryItem={item} />}
      keyExtractor={(item) => item.name}
      numColumns={4}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 8,
        gap: 8,
      }}
      contentContainerStyle={{ flexGrow: 1, gap: 8 }}
      ListHeaderComponent={() => (
        <Text
          style={{
            fontSize: wp("5.2%"),
            marginTop: 5,
          }}
          className="mb-2 font-medium"
        >
          Categories
        </Text>
      )}
    />
  );
};

export default Categories;
