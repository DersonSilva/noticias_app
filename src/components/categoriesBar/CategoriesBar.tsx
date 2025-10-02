import { colors } from "@/constants/Colors";
import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoriesBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ["Todos", "Tecnologia", "Esportes", "Negócios", "Saúde"];

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { width } = Dimensions.get("window");

  const buttonPaddingHorizontal = width * 0.04;
  const buttonPaddingVertical = width * 0.015;
  const fontSize = width * 0.03;

  return (
    <View className="mt-4">
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory;
          return (
            <TouchableOpacity
              onPress={() => onSelectCategory(item)}
              style={{
                paddingHorizontal: buttonPaddingHorizontal,
                paddingVertical: buttonPaddingVertical,
                marginRight: 8,
                borderRadius: 9999,
                backgroundColor: isSelected ? colors.primary : colors.grey,
              }}
            >
              <Text
                style={{
                  fontSize: fontSize,
                  fontWeight: "500",
                  color: isSelected ? colors.text.light : colors.text.dark,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
