import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "./Recipe";
import RecipeCardList from "./RecipeCardList";

const Home = ({ API, API_KEY, endpoint, navigation }) => {

  const [currentScreen, setCurrentScreen] = useState("")
  const [recipes, setRecipes] = useState([])

  const Stack = createNativeStackNavigator()

    useEffect(()=>{
      fetch(API + "/" + API_KEY + endpoint)
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals))      
      .catch((err) => console.log("Error: could not fetch recipes: ", err))
  }, [endpoint])

  const Screen = () => {
    return(
      <RecipeCardList navigation={navigation} recipes={recipes} screen={"Home Recipes"}/>
    )
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: (currentScreen === "Recipe") ? true : false
    }}>
      <Stack.Screen name="Home Screen" component={Screen}/>
      <Stack.Screen initialParams={{setCurrentScreen}} name="Home Recipes" component={Recipe}/>
    </Stack.Navigator>
  )
}

export default Home;
