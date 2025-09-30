import { Stack } from "expo-router";
import "../../css/global.css";
import { NewsProvider } from "../../src/context/NewsContext";

export default function Layout() {
  return (
    <NewsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </NewsProvider>
  );
}
