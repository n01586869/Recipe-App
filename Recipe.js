import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, Button, TouchableNativeFeedback } from "react-native";
import * as WebBrowser from 'expo-web-browser'

function Recipe({ route }) {

  const { setCurrentScreen, data } = route.params;

  const [ingredients, setIngredients] = useState([])
  const [amounts, setAmounts] = useState([])
  const [source, setSource] = useState()

  const title = data.strMeal;
  const img = data.strMealThumb
  const category = data.strCategory;
  const cuisine = data.strArea;
  const instructions = data.strInstructions

  useEffect(() => {
    setCurrentScreen("Recipe")
    for(let i = 0; i < 20; i++){
      const ingredientIndex = "strIngredient" + i
      const amountIndex = "strMeasure" + i
      const ingredient = data[ingredientIndex]
      if(ingredient){
        setIngredients((prev) => [...prev, ingredient])
        setAmounts((prev) => [...prev, data[amountIndex]])
      }
    }

    if(data.strSource) {setSource(data.strSource)}
    return () => setCurrentScreen("Home"); // sets currentScreen variable to "Home" on unmount
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image src={img} style={styles.image} />
      <Text style={styles.title} numberOfLines={4}>{title}</Text>
      <View style={styles.info}>
        <Text style={{fontSize: 16}}>Category: {category}</Text>
        <Text style={{fontSize: 16}}>Cuisine: {cuisine}</Text>
      </View>
      <View style={styles.ingredientsAndAmount}>
        <View>
          {ingredients && ingredients.map((ing, index) => <Text style={{fontSize: 16}} key={index}>{ing}</Text>)}
        </View>
        <View>
          {amounts && amounts.map((amt, index) => <Text style={{fontSize: 16, marginLeft: 10}} key={index}>{amt}</Text>)}
        </View>
      </View>
      <Text style={styles.instructions}>{instructions}</Text>
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
