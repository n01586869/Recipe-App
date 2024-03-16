import { useRef } from "react";
import { View, DrawerLayoutAndroid, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

function Header({ navigation}) {

  return (
    <View>
      <View style={styles.header}>
        <MaterialIcons
          name="menu"
          color={"black"}
          size={28}
          onPress={()=>navigation.openDrawer()}
        />
        <Text style={styles.text}>Header</Text>
      </View>
      <View>
        {/* {showSearch && <SearchBar navigation={navigation} endpoint={endpoint} setEndpoint={setEndpoint}/>} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 18,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    borderBottomColor: "black",
    borderBottomWidth: 0.2,
  },
  text: {
    fontSize: 24,
    marginLeft: 20,
  },
});

export default Header;
