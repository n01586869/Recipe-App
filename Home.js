import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import SearchBar from "./SearchBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header"
import RecipeCard from "./RecipeCard";
import Recipe from "./Recipe";

const Home = ({ route, navigation }) => {

  const renderRecipe = ({ item }) => (
    <RecipeCard
    title={item.strMeal} // change later
    img={item.strMealThumb + "/preview"}
    category={item.strCategory}
    cuisine={item.strArea}
    navigation={navigation}
    data={item}
    />
)

  const API = route.params.API
  const API_KEY = route.params.API_KEY

  const [currentScreen, setCurrentScreen] = useState("Recipe")
  const [recipes, setRecipes] = useState([])
  

  const Stack = createNativeStackNavigator()

    useEffect(()=>{

      fetch(API + "/" + API_KEY + '/randomselection.php')
      // fetch(API + "/" + API_KEY + '/search.php?s=Arrabiata')
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals))
      .catch((err) => console.log("Error: could not fetch recipes: ", err))

  }, [])

  const Screen = () => {
    return(
      <View style={{flex: 1, paddingBottom: 10}}>
        <SearchBar />
        {/* <RecipeCard /> */}
        {/* <Text>{recipes && recipes[0].strCategory}</Text> */}
        <FlatList 
          keyExtractor={(item) => item.strMeal}
          data={recipes}
          renderItem={renderRecipe}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 20
          }}
        />
    </View>
    )
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: (currentScreen === "Recipe") ? true : false
    }}>
      <Stack.Screen name="Home Screen" component={Screen}/>
      <Stack.Screen initialParams={{setCurrentScreen}} name="Recipe" component={Recipe}/>
    </Stack.Navigator>
  )
}

export default Home;
