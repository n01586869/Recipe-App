import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <MaterialIcons // hamburger icon
        name="menu"
        color={"black"}
        size={28}
        onPress={() => navigation.openDrawer()}
      />
      <Text style={styles.text}>Recipe Radar</Text>
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
