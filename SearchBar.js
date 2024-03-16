import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function SearchBar({ endpoint, setEndpoint }) {
  return (
    <View style={styles.textbox}>
      <MaterialIcons name="search" color={"black"} size={20} />
      <TextInput
      placeholder="Search all categories"
      style={styles.text}
      onChangeText={(text) => {
        if(text){
          setEndpoint("/search.php?s=" + text)
        }
        else {
          setEndpoint("/randomselection.php")
          }
        }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  textbox: {
    marginHorizontal: 10,
    marginTop: 5,
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00000030",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingLeft: 5,
  },
});

export default SearchBar;
