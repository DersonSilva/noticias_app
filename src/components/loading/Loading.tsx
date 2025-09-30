import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center mt-4">
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  );
};
