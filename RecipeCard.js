import { Image, StyleSheet, Text, View, TouchableNativeFeedback} from "react-native";
import * as WebBrowser from 'expo-web-browser'
import { memo } from "react";

function RecipeCard({ recipe, navigation, screen }) {

  // useEffect(()=>{
  //   if(!recipe.strCategory){
  //     fetch
  //   }
  // })

  return (
			<TouchableNativeFeedback
        onPress={()=>{
          navigation.navigate(screen, {recipe})
        }}
        onLongPress={() => {
          {WebBrowser.openBrowserAsync(recipe.strYoutube)}
        }}
      >
				<View style={styles.container}>
					<Image src={recipe.strMealThumb + "/preview"} style={styles.image} />
					<Text style={styles.title} numberOfLines={4}>{recipe.strMeal}</Text>
					<View style={styles.info}>
						<Text>Category: {recipe.strCategory}</Text>
						<Text>Cuisine: {recipe.strArea}</Text>
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

export default memo(RecipeCard);
