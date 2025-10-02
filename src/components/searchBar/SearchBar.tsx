import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-white rounded-full px-3 py-1.5 shadow-md mb-4 w-full max-w-screen-md self-center">
      <Ionicons
        name="search"
        size={20}
        color="gray"
        style={{ marginRight: 8 }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Buscar notícias..."}
        className="flex-1 text-sm md:text-base text-gray-700"
        placeholderTextColor={colors.darkGrey}
      />
    </View>
  );
};
