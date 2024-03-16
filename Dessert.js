import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "./Recipe";
import RecipeCardList from "./RecipeCardList";

const Desserts = ({ route, navigation }) => {

  const { API, API_KEY } = route.params

  const [currentScreen, setCurrentScreen] = useState("")
  const [recipes, setRecipes] = useState([])

  const Stack = createNativeStackNavigator()

    useEffect(()=>{
      fetch(API + "/" + API_KEY + "/filter.php?c=Dessert")
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals))      
      .catch((err) => console.log("Error: could not fetch recipes: ", err))
  }, [])

  const Screen = () => {
    return(
      <RecipeCardList navigation={navigation} recipes={recipes} screen={"Dessert Recipes"}/>
    )
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: (currentScreen === "Recipe") ? true : false
    }}>
      <Stack.Screen name="Dessert Screen" component={Screen}/>
      <Stack.Screen initialParams={{setCurrentScreen}} name="Dessert Recipes" component={Recipe}/>
    </Stack.Navigator>
  )
}

export default Desserts;
