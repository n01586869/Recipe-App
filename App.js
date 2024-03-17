import { useState } from "react";
import { SafeAreaView, StyleSheet, LogBox } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";

import Header from './Header';
import Home from "./Home";
import Breakfast from "./Breakfast";
import Dessert from './Dessert';
import SearchBar from './SearchBar';

LogBox.ignoreLogs([ // ignoring an irrelevent warning
  'Non-serializable values were found in the navigation state',
]);

export default function App() {

  const API = "https://www.themealdb.com/api/json/v2"
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY

  const Drawer = createDrawerNavigator()

  // endpoint is used by SearchBar later to change the API endpoint. it's set to what Home will show by default
  const [endpoint, setEndpoint] = useState("/randomselection.php")
  
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
                <SearchBar endpoint={endpoint} setEndpoint={setEndpoint}/>
                <Home API={API} API_KEY={API_KEY} endpoint={endpoint} navigation={navigation}/>
              </>
            )}
          </Drawer.Screen>
          {/* Breakfast screen */}
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Breakfast' component={Breakfast} />
          {/* Dessert screen */}
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Dessert' component={Dessert} />
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
