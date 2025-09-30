import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { fetchNews } from "../api/newsApi";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
  publishedAt: string;
}

interface NewsContextProps {
  news: NewsItem[];
  favorites: NewsItem[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  toggleFavorite: (item: NewsItem) => void;
  fetchAllNews: () => void;
}

export const NewsContext = createContext<NewsContextProps>(
  {} as NewsContextProps
);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [favorites, setFavorites] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllNews();
    loadFavorites();
  }, []);

  useEffect(() => {
    // Atualiza a lista quando o search mudar
    fetchAllNews();
  }, [search]);

  const fetchAllNews = async () => {
    setLoading(true);
    try {
      const data = await fetchNews(search);
      setNews(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar notícias");
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("@favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch (err) {
      console.log("Erro ao carregar favoritos:", err);
    }
  };

  const toggleFavorite = async (item: NewsItem) => {
    let updated: NewsItem[];
    if (favorites.find((f) => f.id === item.id)) {
      updated = favorites.filter((f) => f.id !== item.id);
    } else {
      updated = [...favorites, item];
    }
    setFavorites(updated);
    try {
      await AsyncStorage.setItem("@favorites", JSON.stringify(updated));
    } catch (err) {
      console.log("Erro ao salvar favoritos:", err);
    }
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        favorites,
        loading,
        error,
        search,
        setSearch,
        toggleFavorite,
        fetchAllNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
