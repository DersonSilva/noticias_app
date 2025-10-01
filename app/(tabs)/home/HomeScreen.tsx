import { useRouter } from "expo-router";
import { debounce } from "lodash";
import { useCallback, useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "../../../src/components/loading/Loading";
import { Navbar } from "../../../src/components/navbar/Navbar";
import { NewsCard } from "../../../src/components/newsCard/NewsCard";
import { NewsContext, NewsItem } from "../../../src/context/NewsContext";

export default function HomeScreen() {
  const { news, loading, error, search, setSearch, fetchAllNews } =
    useContext(NewsContext);
  const router = useRouter();

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      fetchAllNews(query);
    }, 700),
    [fetchAllNews]
  );

  useEffect(() => {
    debouncedFetch(search);
    return debouncedFetch.cancel;
  }, [search]);

  const handleOpenDetails = (item: NewsItem) => {
    router.push(
      `/newsDetails/NewsDetailsScreen?newsJson=${encodeURIComponent(
        JSON.stringify(item)
      )}`
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Navbar search={search} setSearch={setSearch} />
      <SafeAreaView className="flex-1">
        {loading && <Loading />}
        {error && <Text className="text-red-500 mt-4 px-4">{error}</Text>}
        <FlatList
          data={news}
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
