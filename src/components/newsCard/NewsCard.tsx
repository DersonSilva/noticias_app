import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { NewsContext, NewsItem } from "../../context/NewsContext";

interface Props {
  item: NewsItem;
  onPress?: () => void;
}

export const NewsCard = ({ item, onPress }: Props) => {
  const { toggleFavorite, favorites } = useContext(NewsContext);
  const isFav = favorites.find((f) => f.id === item.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4 bg-white rounded-xl overflow-hidden"
      style={{
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 16,
        elevation: 16,
      }}
    >
      <View className="relative w-full h-48 bg-gray-200 justify-center items-center rounded-t-xl">
        {item.urlToImage ? (
          <>
            <Image
              source={{ uri: item.urlToImage }}
              className="w-full h-48 rounded-t-xl"
            />
            <View className="absolute inset-0 bg-black/10 rounded-t-xl" />
          </>
        ) : (
          <Ionicons name="image-outline" size={48} color={colors.darkGrey} />
        )}
      </View>

      <View className="p-4">
        <Text className="font-bold text-xl text-gray-800 mb-1">
          {item.title}
        </Text>

        <Text className="text-gray-500 text-sm mb-2">
          {item.source.name} •{" "}
          {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
        </Text>

        <Text className="text-gray-700 mb-4">{item.description}</Text>

        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => toggleFavorite(item)}
            className="px-3 py-1 rounded-full bg-purple-custom flex-row items-center"
          >
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={18}
              color={isFav ? "red" : "white"}
            />
            <Text className="text-sm font-medium text-white ml-2">
              {isFav ? "Favorito" : "Favoritar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(item.url)}
            className="px-3 py-1 rounded-full bg-green-500 flex-row items-center"
          >
            <Ionicons name="link-outline" size={16} color="white" />
            <Text className="text-sm font-medium text-white ml-1">
              Ver original
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
