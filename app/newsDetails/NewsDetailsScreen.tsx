import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NewsItem } from "../../src/context/NewsContext";

export default function NewsDetailScreen() {
  const { newsJson } = useLocalSearchParams<{ newsJson?: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (newsJson) {
      try {
        const parsed = JSON.parse(decodeURIComponent(newsJson));
        setItem(parsed);
      } catch (err) {
        console.log("Erro ao decodificar notícia via JSON:", err);
        setItem(null);
      }
    }
  }, [newsJson]);

  if (!item) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-500">Notícia inválida</Text>
      </View>
    );
  }

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
          {item.source?.name || "Fonte desconhecida"} •{" "}
          {item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString()
            : "Data indisponível"}
        </Text>
        <Text className="text-gray-700 mb-6">
          {item.content || item.description || "Conteúdo não disponível"}
        </Text>
        <TouchableOpacity
          onPress={() => window.open(item.url, "_blank")}
          className="bg-purple-custom py-3 rounded-xl"
        ></TouchableOpacity>
      </View>
    </ScrollView>
  );
}
