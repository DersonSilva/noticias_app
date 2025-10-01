import Constants from "expo-constants";
import { NewsItem } from "../context/NewsContext";

const { GNEWS_API_KEY, GNEWS_BASE_URL } = Constants.expoConfig?.extra || {};

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image?: string;
  source: { name: string };
  publishedAt: string;
}

interface GNewsResponse {
  articles: GNewsArticle[];
  totalArticles: number;
}

// 🔴 Controlador para cancelar requisições antigas
let controller: AbortController | null = null;

export const fetchNews = async (query?: string): Promise<NewsItem[]> => {
  if (!GNEWS_BASE_URL || !GNEWS_API_KEY) {
    throw new Error("API key ou Base URL não configurada");
  }

  // Cancela a requisição anterior antes de criar uma nova
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  const signal = controller.signal;

  try {
    const isSearch = query && query.trim() !== "";
    const url = isSearch
      ? `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(
          query!
        )}&token=${GNEWS_API_KEY}&lang=pt&max=20`
      : `${GNEWS_BASE_URL}/top-headlines?token=${GNEWS_API_KEY}&lang=pt&max=20`;

    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data: GNewsResponse = await response.json();

    return data.articles.map((item, index) => ({
      id: index.toString(),
      title: item.title,
      description: item.description,
      content: item.content,
      url: item.url,
      urlToImage: item.image,
      source: { name: item.source.name },
      publishedAt: item.publishedAt,
    }));
  } catch (error: any) {
    if (error.name === "AbortError") {
      return [];
    }
    console.error("Erro ao buscar notícias:", error.message);
    throw new Error(error.message || "Erro ao buscar notícias");
  }
};
