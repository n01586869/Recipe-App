import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import SearchBar from "./SearchBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header"

const Home = ({ route, navigation }) => {

  const API = route.params.API
  const API_KEY = route.params.API_KEY

  const [recipes, setRecipes] = useState([])

  const Stack = createNativeStackNavigator()

    useEffect(()=>{

      fetch(API + "/" + API_KEY + '/randomselection.php')
      .then((res) => res.json())
      .then((data) => {
      setRecipes(data.meals[0].strMeal)
      })
      .catch((err) => console.log("Error: could not fetch recipes: ", err))

  }, [])

  const Screen = () => {
    return(
      <View>
        <SearchBar />
        <Text>Home</Text>
        <Text>{recipes && recipes}</Text>
    </View>
    )
  }

  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Screen" component={Screen}/>
    </Stack.Navigator>
  )
}

export default Home;
