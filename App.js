import 'react-native-gesture-handler';
import { useRef } from "react";
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


export const Stack = createNativeStackNavigator();

export default function App() {
  const Drawer = createDrawerNavigator()

  // const drawerView = () => {
  //   return (
  //     <View>
  //       <Button title="Btn1" />
  //       <Button title="Btn2" />
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen name="Default" component={Default}/>
          <Stack.Screen name="Category1" component={Category1} />
        </Stack.Navigator> */}
        <Drawer.Navigator screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation}/>
        }}>
          <Drawer.Screen name='Home' component={Home}/>
          <Drawer.Screen name='Breakfast' component={Breakfast} />
          <Drawer.Screen name='Dessert' component={Dessert} />
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
