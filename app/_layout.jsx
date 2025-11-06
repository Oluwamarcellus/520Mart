import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import "../global.css";
import useAuthStore from "../hooks/firebaseAuthentication";

export default function Layout() {
  const { initAuth, loading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="white"
        className="flex-1 bg-blue-400 items-center justify-center"
      />
    );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <StatusBar value="auto" />
      <Stack.Protected guard={isAuthenticated === true}>
        <Stack.Screen name="(tabs)"></Stack.Screen>
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated === false}>
        <Stack.Screen name="index"></Stack.Screen>
        <Stack.Screen name="sign-in"></Stack.Screen>
        <Stack.Screen name="sign-up"></Stack.Screen>
      </Stack.Protected>
    </Stack>
  );
}
