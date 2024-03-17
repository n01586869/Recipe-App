import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function SearchBar({ setEndpoint }) {
  return (
    <View style={styles.textbox}>
      {/* maginfying glass icon */}
      <MaterialIcons name="search" color={"black"} size={20} />
      {/* text field */}
      <TextInput
      placeholder="Search all categories"
      style={styles.text}
      onChangeText={(text) => {
        if(text){ // if text isn't empty, changes endpoint
          setEndpoint("/search.php?s=" + text)
        }
        else { // if empty, sets endpoint to Home
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
    borderColor: "#00000030", // black border with 30% opacity
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingLeft: 5,
  },
});

export default SearchBar;
