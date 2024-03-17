import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "./Recipe";
import RecipeCardList from "./RecipeCardList";

const Breakfast = ({ route, navigation }) => {

  const { API, API_KEY } = route.params

  const [currentScreen, setCurrentScreen] = useState("")
  const [recipes, setRecipes] = useState([])
  const Stack = createNativeStackNavigator()

  useEffect(() => {
    fetch(`${API}/${API_KEY}/filter.php?c=Breakfast`)
    .then(res => res.json())
    .then(data => {
      const mealInfo = data.meals.map(item => {
        const APIFull = `${API}/${API_KEY}/lookup.php?i=${item.idMeal}`;
        return (
          fetch(APIFull)
          .then(res => res.json())
          .then(data => data.meals[0])
        )
      })
      return Promise.all(mealInfo);
    })
    .then(recipes => {
      setRecipes(recipes)
    })
    .catch(error => {
      console.error('Error fetching recipes :', error)
    });
  }, [])

  const Screen = () => {
    return( 
      <>
        {recipes[0] ?
        <RecipeCardList navigation={navigation} recipes={recipes} screen={"Breakfast Recipes"}/>
        :
        <View style={{alignSelf: 'center', marginTop: 30}}><Text>Loading Recipes...</Text></View>}
      </>  
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

export default Breakfast;
