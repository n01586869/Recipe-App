import { useState } from "react";
import { SafeAreaView, StyleSheet, LogBox } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";

import Header from './Header';
import SearchBar from './SearchBar';
import Home from "./Home";
import Breakfast from "./Categories/Breakfast";
import Dessert from './Categories/Dessert';
import Side from "./Categories/Sides";
import Miscellaneous from "./Categories/Miscellaneous";
import Vegan from "./Categories/Vegan";
import Chicken from "./Categories/Chicken"
import Beef from "./Categories/Beef"
import Pork from "./Categories/Pork"
import Goat from "./Categories/Goat"
import Seafood from "./Categories/Seafood"
import Pasta from "./Categories/Pasta"
import Vegetarian from "./Categories/Vegetarian";

LogBox.ignoreLogs([ // ignoring an irrelevent warning
  'Non-serializable values were found in the navigation state',
]);

export default function App() {

  const API = "https://www.themealdb.com/api/json/v2"
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY

  const Drawer = createDrawerNavigator()

  // endpoint is used by SearchBar later to change the API endpoint. it's set to what Home will show by default
  const [endpoint, setEndpoint] = useState("/randomselection.php")
  // showSearch used by Home and Recipe screen to hide SearchBar while inside a Recipe and show it once exited the recipe
  const [showSearch, setShowSearch] = useState(true)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation}/> // replace default header with custom header
        }}>
          {/* Home screen */}
          <Drawer.Screen name='Home'>
            {({navigation}) => (
              <>
                {/* Using render function instead of component prop so SearchBar will only appear on Home screen */}
                {showSearch && <SearchBar setEndpoint={setEndpoint}/>}
                <Home API={API} API_KEY={API_KEY} endpoint={endpoint} navigation={navigation} setShowSearch={setShowSearch}/>
              </>
            )}
          </Drawer.Screen>
          {/* rest of the screens */}
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Breakfast' component={Breakfast} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Dessert' component={Dessert} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Side' component={Side} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Miscellaneous' component={Miscellaneous} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Chicken' component={Chicken} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Beef' component={Beef} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Pork' component={Pork} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Goat' component={Goat} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Seafood' component={Seafood} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Pasta' component={Pasta} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Vegetarian' component={Vegetarian} />
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Vegan' component={Vegan} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
