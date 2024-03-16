import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "./Recipe";
import RecipeCardList from "./RecipeCardList";

const Home = ({ route, navigation }) => {

  const { API, API_KEY } = route.params

  const [currentScreen, setCurrentScreen] = useState("")
  const [recipes, setRecipes] = useState([])

  const Stack = createNativeStackNavigator()

    useEffect(()=>{

      fetch(API + "/" + API_KEY + "/filter.php?c=Breakfast")
      .then((res) => res.json())
      .then((data) => data.meals.map((item) => {
        const id = item.idMeal
        const APIFull = API + "/" + API_KEY + "/lookup.php?i=" + id
        fetch(APIFull)
        .then((res) => res.json())
        .then((data) => setRecipes((prev) => [...prev, data.meals[0]]))
      }))
      .catch((err) => console.log("Error: could not fetch recipes: ", err))
  }, [])

  const Screen = () => {
    return( 
      <RecipeCardList navigation={navigation} recipes={recipes} screen={"Breakfast Recipes"}/>     
    )
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: (currentScreen === "Recipe") ? true : false
    }}>
      <Stack.Screen name="Breakfast Screen" component={Screen}/>
      <Stack.Screen initialParams={{setCurrentScreen}} name="Breakfast Recipes" component={Recipe}/>
    </Stack.Navigator>
  )
}

export default Home;
