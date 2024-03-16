import {useEffect} from "react";
import { Button, Text, View } from "react-native";
import SearchBar from "./SearchBar";

const Breakfast = ({ navigation }) => {

  return(
    <View>
      <Text>Category1</Text>
      <Button title="Press" onPress={()=>{navigation.navigate("Home")}}/>
    </View>
  )
}

export default Breakfast;

