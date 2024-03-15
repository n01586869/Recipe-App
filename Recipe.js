import {useEffect} from 'react';
import { Text, View } from 'react-native';

function Recipe({ route }) {

    const { setCurrentScreen, props } = route.params

    useEffect(()=>{
        return () => setCurrentScreen("Home") // sets currentScreen variable to "Home" on unmount
    }, [])

    return (
        <View>
            <Text>{props.title}</Text>
        </View>
    );
}

export default Recipe;