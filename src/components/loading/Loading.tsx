import { colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";

interface LoadingProps {
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ color }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={color || colors.primary} />
    </View>
  );
};
