import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { categoryMenus, flyers } from "../constants/images";
import Categories from "./Categories";
import Flyers from "./Flyers";
import ItemsCard from "./ItemsCard";

const mockProducts = [
  {
    title: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    description:
      "Experience immersive sound and active noise cancellation with 30 hours of battery life.",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
  },
  {
    title: "Smart Fitness Watch",
    price: 129.99,
    description:
      "Track your workouts, heart rate, and sleep with this sleek, waterproof fitness companion.",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    category: "Hobbies",
  },
  {
    title: "Mechanical Gaming Keyboard",
    price: 89.99,
    description:
      "RGB backlit mechanical keyboard with tactile switches for precision and speed.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
  },
  {
    title: "4K Ultra HD Monitor",
    price: 349.99,
    description:
      "27-inch 4K display with HDR support and ultra-thin bezels for stunning visuals.",
    image:
      "https://images.unsplash.com/photo-1587202372775-98926b1ccad2?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
  },
  {
    title: "Portable Bluetooth Speaker",
    price: 59.99,
    description:
      "Compact and waterproof speaker delivering powerful sound wherever you go.",
    image:
      "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&w=800&q=80",
    category: "Hobbies",
  },
  {
    title: "Ergonomic Office Chair",
    price: 249.99,
    description:
      "Adjustable lumbar support and breathable mesh back designed for all-day comfort.",
    image:
      "https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=800&q=80",
    category: "Properties",
  },
  {
    title: "Smart Home Security Camera",
    price: 99.99,
    description:
      "1080p Wi-Fi camera with night vision, motion detection, and two-way audio.",
    image:
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
  },
  {
    title: "Electric Standing Desk",
    price: 499.99,
    description:
      "Height-adjustable desk with smooth electric lift and spacious work surface.",
    image:
      "https://images.unsplash.com/photo-1606813902915-4079d26c7c0a?auto=format&fit=crop&w=800&q=80",
    category: "Properties",
  },
  {
    title: "Wireless Charging Pad",
    price: 29.99,
    description:
      "Fast-charging Qi pad compatible with iPhone, Samsung, and other wireless devices.",
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
  },
  {
    title: "Smart LED Light Bulb",
    price: 19.99,
    description:
      "Control brightness and color with your phone or voice assistant.",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
    category: "Cars",
  },
];

const LatestItems = () => {
  const tabBarHeight = useBottomTabBarHeight();

  console.log(tabBarHeight);

  return (
    <FlatList
      data={mockProducts}
      renderItem={({ item }) => <ItemsCard item={item} />}
      keyExtractor={(item) => item.title}
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
    />
  );
};

export default LatestItems;
