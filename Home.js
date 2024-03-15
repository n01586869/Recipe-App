import React from "react";
import { Text, View } from "react-native";
import SearchBar from "./SearchBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header"

const Home = ({ navigation }) => {

  const Stack = createNativeStackNavigator()

  const Screen = () => {
    return(
      <View>
        <SearchBar />
        <Text>Home</Text>
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
