import React from "react";
import { Image, StyleSheet, Text, View, TouchableNativeFeedback} from "react-native";

function RecipeCard(props) {

  return (
			<TouchableNativeFeedback onPress={()=>{
        props.setCurrentScreen("Recipe")
        props.navigation.navigate("Recipe", { navigation: props.navigation , props: props})
      }}>
				<View style={styles.container}>
					<Image src={props.img} style={styles.image} />
					<Text style={styles.title} numberOfLines={4}>{props.title}</Text>
					<View style={styles.info}>
						<Text>Category: {props.category}</Text>
						<Text>Cuisine: {props.cuisine}</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		);

}

const styles = StyleSheet.create({
  container: {
    borderColor: "#00000030",
    borderWidth: 1,
    alignSelf: "center",
		width: '45%',
    height: 330,
    borderRadius: 8,
    marginTop: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
		alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginHorizontal: 5,
  },
  info: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginHorizontal: 5,
  },
});

export default RecipeCard;
