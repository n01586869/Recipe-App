import { Image, StyleSheet, Text, View, TouchableNativeFeedback} from "react-native";
import * as WebBrowser from 'expo-web-browser'

function RecipeCard({ recipe, navigation, screen }) {

  return (
			<TouchableNativeFeedback
        onPress={()=>{
          navigation.navigate(screen, {recipe}) // on press, go to Recipe screen and pass recipe data
        }}
        onLongPress={() => {
          {WebBrowser.openBrowserAsync(recipe.strYoutube)} // on Long press, go to youtube video for recipe
        }}
      >
				<View style={styles.container}>
					<Image src={recipe.strMealThumb + "/preview"} style={styles.image} />
          {/* title */}
					<Text style={styles.title} numberOfLines={4}>{recipe.strMeal}</Text> 
          {/* category and cuisine */}
          <Text style={styles.info}>Category: {recipe.strCategory}</Text>
          <Text style={styles.info}>Cuisine: {recipe.strArea}</Text>
				</View>
			</TouchableNativeFeedback>
		);

}

const styles = StyleSheet.create({
  container: {
    borderColor: "#00000030", // black border at 30% opacity
    borderWidth: 1,
    alignSelf: "center",
		width: '45%',
    height: 330,
    borderRadius: 8, // rounded edges
    marginTop: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
		alignSelf: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginHorizontal: 5,
  },
  info: {
    marginHorizontal: 5,
  },
});

export default RecipeCard;
