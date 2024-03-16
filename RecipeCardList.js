import { View, FlatList } from "react-native";
import RecipeCard from "./RecipeCard";

const RecipeCardList = ({recipes, navigation}) => {

  const renderRecipe = ({ item }) => (
    <RecipeCard navigation={navigation} recipe={item} />
  );

  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <FlatList
        keyExtractor={(item) => item.strMeal}
        data={recipes}
        renderItem={renderRecipe}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      />
    </View>
  );
};

export default RecipeCardList