import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "../Recipe";
import RecipeCardList from "../RecipeCardList";

const Seafood = ({ route, navigation }) => {

  const { API, API_KEY } = route.params // get api and api_key from route params

  // set state vars
  const [currentScreen, setCurrentScreen] = useState("") // this is used for toggling the header applied on a stack screen
  const [recipes, setRecipes] = useState([]) // this is data received from api

  const Stack = createNativeStackNavigator()

  useEffect(() => {
    fetch(`${API}/${API_KEY}/filter.php?c=Seafood`) // get list of Seafood recipes. this returns array of objects with only meal id and thumbnail
    .then(res => res.json()) // parse json
    .then(data => {
      // since array of objects contains only meal id, need to do another fetch to get every meal by meal id
      const mealInfo = data.meals.map(item => { // stores array of promises for recipes in mealInfo buffer (eventually will use this in setRecipes)
        const APIFull = `${API}/${API_KEY}/lookup.php?i=${item.idMeal}`; // making full api string for readability
        return ( // returns the fetch promise which will eventually be evaluated to this specific recipe
          fetch(APIFull)
          .then(res => res.json())
          .then(data => data.meals[0])
        )
      })
      return Promise.all(mealInfo); // returns the promise which will resolve once all the promises in mealInfo are resolved
    })
    .then(mealInfo => {
      setRecipes(mealInfo) // once all mealInfo promises are resolved, sets recipes to mealInfo
    })
    .catch(error => { // error handling
      console.error('Error fetching recipes :', error)
    });
  }, [])

  const SeafoodScreen = () => {
    return( 
      <>
        {recipes[0] ? // Loading screen while waiting for fetch
        <RecipeCardList navigation={navigation} recipes={recipes} screen={"Seafood Recipes"}/>
        :
        <View style={{alignSelf: 'center', marginTop: 30}}><Text>Loading Recipes...</Text></View>}
      </>  
    )
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: (currentScreen === "Recipe") ? true : false // hides Stack header if not in a Recipe
    }}>
      <Stack.Screen name="Seafood Screen" component={SeafoodScreen}/>
      <Stack.Screen initialParams={{setCurrentScreen}} name="Seafood Recipes" component={Recipe}/>
    </Stack.Navigator>
  )
}

export default Seafood;
