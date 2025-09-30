import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NewsItem } from "../../src/context/NewsContext";

export default function NewsDetailScreen() {
  const params = useLocalSearchParams<{ item: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (params.item) {
      setItem(JSON.parse(decodeURIComponent(params.item)));
    }
  }, [params.item]);

  if (!item) return null;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} className="w-full h-60" />
      )}
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {item.title}
        </Text>
        <Text className="text-gray-500 text-sm mb-4">
          {item.source.name} • {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
        <Text className="text-gray-700 mb-6">
          {item.content || item.description}
        </Text>

        <TouchableOpacity
          onPress={() => window.open(item.url, "_blank")}
          className="bg-purple-custom py-3 rounded-xl"
        >
          <Text className="text-center text-white font-semibold">
            Ler notícia completa
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
