import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({navigation}) => {
  const[likedRecipes,setLikedRecipes] = useState([])
  useEffect(() => {
    
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.removeItem('LikedRecipes')
      AsyncStorage.getItem('LikedRecipes', (err, result) => {
        if (result != null) {
            const recipes = JSON.parse(result)
            setLikedRecipes(recipes)
        }
        else{
          console.log('first')
        }
      })
    });
    return unsubscribe;
   
  }, [navigation]);
  
  
  return (
    <View>
      {likedRecipes?.map((recipe) => <Text>{recipe.name}</Text>)}
      
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})