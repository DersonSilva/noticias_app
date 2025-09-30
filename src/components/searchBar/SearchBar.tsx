import { Ionicons } from "@expo/vector-icons"; // ícones do Expo
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
    <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-md mb-4">
      <Ionicons name="search" size={20} color="#9CA3AF" className="mr-2" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Buscar notícias..."}
        className="flex-1 text-gray-700"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};
