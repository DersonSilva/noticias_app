import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NewsItem } from "../../src/context/NewsContext";

export default function NewsDetailScreen() {
  const { newsJson } = useLocalSearchParams<{ newsJson?: string }>();
  const router = useRouter();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [imageError, setImageError] = useState(false);

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
        <Ionicons
          name="alert-circle-outline"
          size={40}
          className="text-gray-400"
        />
        <Text className="text-gray-400 mt-2">Notícia inválida</Text>
      </View>
    );
  }

  const { width } = Dimensions.get("window");
  const cleanContent = item.content?.replace(/\[\d+\s*chars\]/, "") ?? null;

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow"
        style={{ elevation: 3 }}
      >
        <Ionicons name="arrow-back" size={20} className="text-gray-700" />
      </TouchableOpacity>

      <View
        style={{ width, height: width * 0.6 }}
        className="bg-gray-200 justify-center items-center"
      >
        {!imageError && item.urlToImage ? (
          <Image
            source={{ uri: item.urlToImage }}
            style={{ width, height: width * 0.6 }}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <Ionicons name="image-outline" size={80} className="text-gray-400" />
        )}
      </View>

      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
          {item.title}
        </Text>

        <Text className="text-gray-500 text-sm mb-4">
          {item.source?.name || "Fonte desconhecida"} •{" "}
          {item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString("pt-BR")
            : "Data indisponível"}
        </Text>

        <Text className="text-gray-700 text-base leading-relaxed mb-6">
          {cleanContent ||
            item.description ||
            "Conteúdo completo não disponível. Acesse a fonte para mais detalhes."}
        </Text>

        <TouchableOpacity
          onPress={() => item.url && Linking.openURL(item.url)}
          className="bg-purple-custom flex-row items-center justify-center py-3 rounded-xl"
          activeOpacity={0.8}
        >
          <Ionicons name="open-outline" size={20} className="text-white" />
          <Text className="text-white font-semibold ml-2">
            Ler notícia completa
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
