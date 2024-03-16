import 'react-native-gesture-handler';
import { useEffect, useRef } from "react";
import {
  DrawerLayoutAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";

import Header from './Header';
import Home from "./Home";
import Breakfast from "./Breakfast";
import Dessert from './Dessert';


export default function App() {

  const API = "https://www.themealdb.com/api/json/v2"
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY
  const Drawer = createDrawerNavigator()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation}/>
        }}>
          <Drawer.Screen initialParams={{ API: API, API_KEY: API_KEY}} name='Home' component={Home}/>
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
