import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import * as WebBrowser from 'expo-web-browser'

function Recipe({ route }) {

  const { setCurrentScreen, recipe, setShowSearch } = route.params; //destructure setCurrentScreen and recipe from params

  const [ingredients, setIngredients] = useState([])
  const [amounts, setAmounts] = useState([])
  const [source, setSource] = useState()

  useEffect(() => {

    // sets currentScreen to "Recipe" so Stack header is shown
    setCurrentScreen("Recipe")
    // if setShowSearch exists, will set it to false on mount
    if(setShowSearch) setShowSearch(false)

    for(let i = 0; i < 20; i++){ // since API only allows for 20 ingredients/amounts at most, set i max to 20
      const ingredientIndex = "strIngredient" + i
      const amountIndex = "strMeasure" + i
      const ingredient = recipe[ingredientIndex] // dynamically access object field
      if(ingredient){ // if ingredient exists, amount will also exist, so sets both at same time
        setIngredients((prev) => [...prev, ingredient])
        setAmounts((prev) => [...prev, recipe[amountIndex]])
      }
    }

    if(recipe.strSource) {setSource(recipe.strSource)} // if source exists, sets the source

    return () => {
      // sets currentScreen variable to "" on unmount, which will hide the header afterwards
      setCurrentScreen("");
      // if setShowSearch exists, will set it to true on unmount
      if(setShowSearch) setShowSearch(true)
     } 
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* image */}
      <Image src={recipe.strMealThumb} style={styles.image} />
      {/* title */}
      <Text style={styles.title} numberOfLines={4}>{recipe.strMeal}</Text>
      {/* container for category and cuisine */}
      <View style={styles.info}>
        <Text style={{fontSize: 16}}>Category: {recipe.strCategory}</Text>
        <Text style={{fontSize: 16}}>Cuisine: {recipe.strArea}</Text>
      </View>
      {/* container for ingredients and amount */}
      <View style={styles.ingredientsAndAmount}>
        <View>
          {/* mapping ingredients array */}
          {ingredients && ingredients.map((ing, index) => <Text style={{fontSize: 16}} key={index}>{ing}</Text>)}
        </View>
        <View>
          {/* mapping amounts array */}
          {amounts && amounts.map((amt, index) => <Text style={{fontSize: 16, marginLeft: 10}} key={index}>{amt}</Text>)}
        </View>
      </View>
      {/* recipe directions */}
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      {source && // if source exists, render source button. on click, open browser and bring to source
      <TouchableNativeFeedback onPress={() => {WebBrowser.openBrowserAsync(source)}}>
        <View style={styles.source}>
          <Text>Source</Text>
        </View>
      </TouchableNativeFeedback>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10
  },
  image: {
    width: "80%",
    aspectRatio: 1, // keeps image as square
		alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: "600",
    width: '90%',
    textAlign: 'center'
  },
  source: {
    borderWidth: 0,
    width: '20%',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 6,
    paddingVertical: 6
  },
  ingredientsAndAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5,
    minWidth: '70%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  instructions: {
    width: '90%',
    alignSelf: 'center',
    fontSize: 16
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  }
})

export default Recipe;
