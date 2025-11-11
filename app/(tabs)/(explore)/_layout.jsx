import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="explore"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="card_detail" options={{}} />
    </Stack>
  );
};

export default _layout;
