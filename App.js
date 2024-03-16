import 'react-native-gesture-handler';
import { useEffect, useRef, useState } from "react";
import {
  DrawerLayoutAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  LogBox
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";

import Header from './Header';
import Home from "./Home";
import Breakfast from "./Breakfast";
import Dessert from './Dessert';
import SearchBar from './SearchBar';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App() {

  const API = "https://www.themealdb.com/api/json/v2"
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY
  const Drawer = createDrawerNavigator()

  const [endpoint, setEndpoint] = useState("/randomselection.php")
  const [showSearch, setShowSearch] = useState(true)
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation}/>
        }}>
          <Drawer.Screen name='Home'>
            {({navigation}) => (
              <>
                <SearchBar showSearch={showSearch} endpoint={endpoint} setEndpoint={setEndpoint}/>
                <Home API={API} API_KEY={API_KEY} endpoint={endpoint} setEndpoint={setEndpoint} navigation={navigation}/>
              </>
            )}
          </Drawer.Screen>
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Breakfast' component={Breakfast} />
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
