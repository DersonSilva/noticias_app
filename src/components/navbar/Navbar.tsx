import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "../searchBar/SearchBar";

interface NavbarProps {
  search: string;
  setSearch: (text: string) => void;
}

export const Navbar = ({ search, setSearch }: NavbarProps) => {
  return (
    <View
      className="bg-purple-custom  pb-4 px-4 pt-10 rounded-b-3xl"
      style={{ paddingTop: StatusBar.currentHeight || 40 }} // <- Isso faz pegar do topo
    >
      <StatusBar barStyle="light-content" className="bg-purple-custom" />
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1 ml-4">
          <Ionicons
            name="newspaper-outline"
            size={22}
            color="white"
            className="mr-2"
          />
          <Text className="text-white font-semibold text-lg">Notícias</Text>
        </View>

        <View className="flex-row space-x-3">
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={22}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar value={search} onChangeText={setSearch} />
    </View>
  );
};
