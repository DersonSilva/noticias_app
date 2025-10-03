import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewsItem } from "../context/NewsContext";

export const loadFavorites = async (): Promise<NewsItem[]> => {
  try {
    const stored = await AsyncStorage.getItem("@favorites");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.log("Erro ao carregar favoritos:", err);
    return [];
  }
};

export const saveFavorites = async (favorites: NewsItem[]) => {
  try {
    await AsyncStorage.setItem("@favorites", JSON.stringify(favorites));
  } catch (err) {
    console.log("Erro ao salvar favoritos:", err);
  }
};
