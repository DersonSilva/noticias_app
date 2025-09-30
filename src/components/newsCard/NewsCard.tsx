// import { useContext } from "react";
// import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
// import { NewsContext, NewsItem } from "../../context/NewsContext";

// interface Props {
//   item: NewsItem;
//   onPress?: () => void;
// }

// export const NewsCard = ({ item, onPress }: Props) => {
//   const { toggleFavorite, favorites } = useContext(NewsContext);
//   const isFav = favorites.find((f) => f.id === item.id);

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="mb-4 rounded-lg bg-white shadow p-3"
//     >
//       {item.urlToImage && (
//         <Image
//           source={{ uri: item.urlToImage }}
//           className="w-full h-40 rounded-md mb-2"
//         />
//       )}
//       <Text className="font-bold text-lg mb-1">{item.title}</Text>
//       <Text className="text-gray-500 text-sm mb-2">
//         {item.source.name} • {new Date(item.publishedAt).toLocaleDateString()}
//       </Text>
//       <Text className="text-gray-700 mb-2">{item.description}</Text>
//       <View className="flex-row justify-between items-center">
//         <TouchableOpacity onPress={() => toggleFavorite(item)}>
//           <Text className="text-blue-500">
//             {isFav ? "★ Favorito" : "☆ Favorito"}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
//           <Text className="text-green-500">Ver original</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// };

import { useContext } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { NewsContext, NewsItem } from "../../context/NewsContext";

interface Props {
  item: NewsItem;
  onPress?: () => void;
}

export const NewsCard = ({ item, onPress }: Props) => {
  const { toggleFavorite, favorites } = useContext(NewsContext);
  const isFav = favorites.find((f) => f.id === item.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4 bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {item.urlToImage && (
        <View className="relative">
          <Image source={{ uri: item.urlToImage }} className="w-full h-48" />
          <View className="absolute inset-0 bg-black opacity-10 rounded-t-xl" />
        </View>
      )}
      <View className="p-4">
        <Text className="font-bold text-xl text-gray-800 mb-1">
          {item.title}
        </Text>
        <Text className="text-gray-500 text-sm mb-2">
          {item.source.name} • {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
        <Text className="text-gray-700 mb-4">{item.description}</Text>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => toggleFavorite(item)}
            className="px-3 py-1 rounded-full bg-yellow-100"
          >
            <Text
              className={`text-sm font-medium ${
                isFav ? "text-yellow-600" : "text-gray-600"
              }`}
            >
              {isFav ? "★ Favorito" : "☆ Favorito"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(item.url)}
            className="px-3 py-1 rounded-full bg-green-100"
          >
            <Text className="text-sm font-medium text-green-600">
              Ver original
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
