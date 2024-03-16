import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import * as WebBrowser from 'expo-web-browser'

function Recipe({ route }) {

  const { setCurrentScreen, recipe } = route.params;

  const [ingredients, setIngredients] = useState([])
  const [amounts, setAmounts] = useState([])
  const [source, setSource] = useState()

  useEffect(() => {

    setCurrentScreen("Recipe")

    for(let i = 0; i < 20; i++){
      const ingredientIndex = "strIngredient" + i
      const amountIndex = "strMeasure" + i
      const ingredient = recipe[ingredientIndex]
      if(ingredient){
        setIngredients((prev) => [...prev, ingredient])
        setAmounts((prev) => [...prev, recipe[amountIndex]])
      }
    }

    if(recipe.strSource) {setSource(recipe.strSource)}
    
    return () => setCurrentScreen("Home"); // sets currentScreen variable to "Home" on unmount
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image src={recipe.strMealThumb} style={styles.image} />
      <Text style={styles.title} numberOfLines={4}>{recipe.strMeal}</Text>
      <View style={styles.info}>
        <Text style={{fontSize: 16}}>Category: {recipe.strCategory}</Text>
        <Text style={{fontSize: 16}}>Cuisine: {recipe.strArea}</Text>
      </View>
      <View style={styles.ingredientsAndAmount}>
        <View>
          {ingredients && ingredients.map((ing, index) => <Text style={{fontSize: 16}} key={index}>{ing}</Text>)}
        </View>
        <View>
          {amounts && amounts.map((amt, index) => <Text style={{fontSize: 16, marginLeft: 10}} key={index}>{amt}</Text>)}
        </View>
      </View>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      {source && 
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
    aspectRatio: 1,
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
