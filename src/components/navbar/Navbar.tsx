import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NewsContext } from "../../context/NewsContext";
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
  const { favorites } = useContext(NewsContext);

  return (
    <View
      className="bg-purple-custom pb-4 px-4 rounded-b-3xl w-full"
      style={{ paddingTop: insets.top + 15 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View className="flex-row items-center justify-between mb-4">
        {/* Título Notícias */}
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

        {/* Ícone de Favoritos com Badge */}
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={() => setShowFavorites(!showFavorites)}
            className="relative"
          >
            <Ionicons
              name={showFavorites ? "heart" : "heart-outline"}
              size={28}
              color={showFavorites ? "red" : "white"}
            />
            {favorites.length > 0 && (
              <View
                className="absolute -top-2 -right-2 bg-red-500 rounded-full"
                style={{
                  minWidth: 16,
                  height: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text className="text-white text-xs font-bold">
                  {favorites.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <SearchBar value={search} onChangeText={setSearch} />
    </View>
  );
};
