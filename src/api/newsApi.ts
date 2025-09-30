import { NewsItem } from "../context/NewsContext";

export const fetchNews = async (query?: string): Promise<NewsItem[]> => {
  await new Promise((r) => setTimeout(r, 500)); // Simula loading

  const fakeData: NewsItem[] = [
    {
      id: "1",
      title: "Notícia de Tecnologia",
      description: "Descrição resumida da notícia de tecnologia",
      content: "Conteúdo completo da notícia de tecnologia",
      url: "https://example.com/news/1",
      urlToImage: "https://via.placeholder.com/300x150.png?text=Tech",
      source: { name: "Tech News" },
      publishedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Notícia de Negócios",
      description: "Resumo da notícia de negócios",
      content: "Conteúdo completo da notícia de negócios",
      url: "https://example.com/news/2",
      urlToImage: "https://via.placeholder.com/300x150.png?text=Business",
      source: { name: "Business News" },
      publishedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Notícia de Esportes",
      description: "Resumo da notícia de esportes",
      content: "Conteúdo completo da notícia de esportes",
      url: "https://example.com/news/3",
      urlToImage: "https://via.placeholder.com/300x150.png?text=Sports",
      source: { name: "Sports News" },
      publishedAt: new Date().toISOString(),
    },
  ];

  if (!query) return fakeData;

  return fakeData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};

// import Constants from "expo-constants";
// import { NewsItem } from "../context/NewsContext";

// const { GNEWS_API_KEY, GNEWS_BASE_URL } = Constants.expoConfig?.extra || {};
// console.log("GNEWS_BASE_URL:", GNEWS_BASE_URL);
// console.log("GNEWS_API_KEY:", GNEWS_API_KEY);

// interface GNewsArticle {
//   title: string;
//   description: string;
//   content: string;
//   url: string;
//   image?: string;
//   source: { name: string };
//   publishedAt: string;
// }

// interface GNewsResponse {
//   articles: GNewsArticle[];
//   totalArticles: number;
// }

// export const fetchNews = async (query?: string): Promise<NewsItem[]> => {
//   if (!GNEWS_BASE_URL || !GNEWS_API_KEY) {
//     throw new Error("API key ou Base URL não configurada");
//   }

//   try {
//     const url = `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(
//       query || ""
//     )}&token=${GNEWS_API_KEY}&lang=pt&max=20`;

//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Erro na API: ${response.status}`);
//     }

//     const data: GNewsResponse = await response.json();

//     return data.articles.map((item, index) => ({
//       id: index.toString(),
//       title: item.title,
//       description: item.description,
//       content: item.content,
//       url: item.url,
//       urlToImage: item.image,
//       source: { name: item.source.name },
//       publishedAt: item.publishedAt,
//     }));
//   } catch (error: any) {
//     console.error("Erro ao buscar notícias:", error.message);
//     throw new Error(error.message || "Erro ao buscar notícias");
//   }
// };
