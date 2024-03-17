import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "./Recipe";
import RecipeCardList from "./RecipeCardList";

// destructure props
const Home = ({ API, API_KEY, endpoint, navigation, setShowSearch }) => {

  // set state vars
  const [currentScreen, setCurrentScreen] = useState("") // this is used for toggling the header applied on a stack screen
  const [recipes, setRecipes] = useState([]) // this is data received from api
  const [errorMsg, setErrorMsg] = useState("")

  const Stack = createNativeStackNavigator()

  useEffect(()=>{
      fetch(`${API}/${API_KEY}${endpoint}`) // dynamic endpoint for SearchBar functionality
      .then(res => res.json())
      .then(data => {
        if (data.meals) { // if search returns some recipes, data.meals won't be null
          setRecipes(data.meals);
        } else { // error handling incase user searches for something that doesn't exist
          setRecipes([])
          setErrorMsg("No recipes")
        }
      })
      .catch(err => console.log("Error: could not fetch recipes: ", err))
  }, [endpoint])

  const HomeScreen = () => {
    return( 
      <>
        {recipes[0] ? // Loading screen while waiting for fetch
        <RecipeCardList navigation={navigation} recipes={recipes} screen={"Home Recipes"}/>
        :
        <View style={{alignSelf: 'center', marginTop: 30}}><Text>{errorMsg ? errorMsg : "Loading Recipes..."}</Text></View>}
      </>  
    )
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: (currentScreen === "Recipe") ? true : false // hides Stack header if not in a Recipe
    }}>
      <Stack.Screen name="Home Screen" component={HomeScreen}/>
      <Stack.Screen initialParams={{setCurrentScreen, setShowSearch}} name="Home Recipes" component={Recipe}/>
    </Stack.Navigator>
  )
}

export default Home;
