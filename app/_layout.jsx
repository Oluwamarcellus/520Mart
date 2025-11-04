import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="(tabs)"></Stack.Screen>
      <Stack.Screen name="sign-in"></Stack.Screen>
      <Stack.Screen name="sign-up"></Stack.Screen>
    </Stack>
  );
}
