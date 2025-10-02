import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/Colors";
import { CategoriesBar } from "../../../src/components/categoriesBar/CategoriesBar";
import { Loading } from "../../../src/components/loading/Loading";
import { Navbar } from "../../../src/components/navbar/Navbar";
import { NewsCard } from "../../../src/components/newsCard/NewsCard";
import { NewsItem, useNews } from "../../../src/context/NewsContext";

export default function HomeScreen() {
  const { news, favorites, loading, error, search, setSearch, fetchAllNews } =
    useNews();
  const router = useRouter();

  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const debouncedFetch = useCallback(
    debounce((query: string, category: string) => {
      if (!showFavorites) fetchAllNews(query, category);
    }, 700),
    [fetchAllNews, showFavorites]
  );

  useEffect(() => {
    debouncedFetch(search, selectedCategory);
    return debouncedFetch.cancel;
  }, [search, selectedCategory, showFavorites]);

  const handleOpenDetails = (item: NewsItem) => {
    router.push(
      `/newsDetails/NewsDetailsScreen?newsJson=${encodeURIComponent(
        JSON.stringify(item)
      )}`
    );
  };

  const displayedNews = showFavorites ? favorites : news;

  return (
    <View className="flex-1 bg-gray-50">
      <Navbar
        search={search}
        setSearch={setSearch}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      {!showFavorites && (
        <CategoriesBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <SafeAreaView className="flex-1">
        {loading && !showFavorites && <Loading />}

        {error && <Text className="text-red-500 mt-4 px-4">{error}</Text>}

        {displayedNews.length === 0 && !loading && (
          <View className="flex items-center justify-center mt-12 px-4">
            <Ionicons
              name={
                showFavorites ? "heart-dislike-outline" : "newspaper-outline"
              }
              size={36}
              color={colors.darkGrey}
              className="mb-2"
            />
            <Text className="text-center text-gray-500 text-base font-medium">
              {showFavorites
                ? "Nenhum favorito encontrado"
                : "Nenhuma notícia encontrada"}
            </Text>
          </View>
        )}
        <FlatList
          data={displayedNews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewsCard item={item} onPress={() => handleOpenDetails(item)} />
          )}
          showsVerticalScrollIndicator={false}
          className="px-4 mt-2"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </View>
  );
}
