import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchBar } from "../searchBar/SearchBar";

interface NavbarProps {
  search: string;
  setSearch: (text: string) => void;
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
}

export const Navbar = ({
  search,
  setSearch,
  showFavorites,
  setShowFavorites,
}: NavbarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-purple-custom pb-4 px-4 rounded-b-3xl w-full"
      style={{ paddingTop: insets.top + 15 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={() => setShowFavorites(false)}
          className="flex-row items-center flex-1 ml-2"
          activeOpacity={0.7}
        >
          <Ionicons
            name="newspaper-outline"
            size={24}
            color="white"
            style={{ marginRight: 6 }}
          />
          <Text className="text-white font-semibold text-base md:text-lg">
            Notícias
          </Text>
        </TouchableOpacity>

        <View className="flex-row space-x-3">
          <TouchableOpacity onPress={() => setShowFavorites(!showFavorites)}>
            <Ionicons
              name={showFavorites ? "heart" : "heart-outline"}
              size={24}
              color={showFavorites ? "red" : "white"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />
    </View>
  );
};
