import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNewsFetch } from "../hooks/useFetchNews";
import { loadFavorites, saveFavorites } from "../storage/favorites";

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
  fetchAllNews: (query?: string, category?: string) => void;
}

export const NewsContext = createContext<NewsContextProps>(
  {} as NewsContextProps
);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const { news, loading, error, fetchAllNews, setNews } = useNewsFetch();
  const [favorites, setFavorites] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllNews();
    loadFavoritesFromStorage();
  }, []);

  const loadFavoritesFromStorage = async () => {
    const stored = await loadFavorites();
    setFavorites(stored);
  };

  const toggleFavorite = async (item: NewsItem) => {
    let updated: NewsItem[];
    if (favorites.find((f) => f.id === item.id)) {
      updated = favorites.filter((f) => f.id !== item.id);
    } else {
      updated = [...favorites, item];
    }
    setFavorites(updated);
    await saveFavorites(updated);
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

export const useNews = () => useContext(NewsContext);
