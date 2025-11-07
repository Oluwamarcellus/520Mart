import { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

const categories = [
  "Electronics",
  "Furnitures",
  "Education",
  "Cars",
  "Clothings",
  "Properties",
  "Jobs",
  "Hobbies",
];

export default function CustomSelect({ selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {/* Select Box */}
      <TouchableOpacity
        className="flex-row justify-between items-center bg-blue-50 mt-2 rounded-2xl px-4 py-4 border-2 border-blue-200"
        onPress={() => setOpen(true)}
      >
        <Text
          className=" "
          style={{
            color: selected ? "rgba(0,0,0,0.7)" : "gray",
            fontSize: wp("4.5%"),
          }}
        >
          {selected || "Select category"}
        </Text>

        <Ionicons name="caret-down" size={12} color={"gray"} />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal transparent visible={open} animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
          onPress={() => setOpen(false)}
          activeOpacity={1}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "80%",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  style={{
                    padding: 12,
                    borderBottomWidth: categories.length - 1 === index ? 0 : 1,
                    borderBottomColor: "#eeeeeeff",
                  }}
                >
                  <Text
                    style={{ color: "rgba(0,0,0,0.7)", fontSize: wp("4.5%") }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
