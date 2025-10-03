import { useCallback, useState } from "react";
import { fetchNewsApi } from "../api/newsApi";
import { NewsItem } from "../context/NewsContext";

export const useNewsFetch = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNews = useCallback(
    async (query?: string, category?: string) => {
      setLoading(true);
      try {
        let finalQuery = query ?? "";
        if (category && category !== "Todos") {
          finalQuery += ` ${category}`;
        }
        const data = await fetchNewsApi(finalQuery);
        setNews(data);
        setError(null);
      } catch (err: any) {
        console.warn("Erro ao buscar notícias:", err.message);
        setNews([]);
        setError("Erro ao carregar notícias");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { news, loading, error, fetchAllNews, setNews };
};
