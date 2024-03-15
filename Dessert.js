import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';

import SearchBar from './SearchBar';

function Dessert(props) {
    const Stack = createNativeStackNavigator()

    const Screen = () => {
      return(
        <View>
          <SearchBar />
          <Text>Dessert</Text>
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

export default Dessert;