import { StyleSheet, Text, View } from 'react-native'
import React ,{useEffect} from 'react'

const Recipes = () => {

  const fetchApi = () => {
    fetch("https://localhost:44348/api/RecipeEntities")
      .then((res) => res.json())
      .then((data) => {
        console.log('data')
        console.log(data);
      });
  };
  /* useEffect(() => {
    fetchApi()
  }, []);
 */

  return (
    <View>
      <Text>RecipsScreen</Text>
    </View>
  )
}

export default Recipes

const styles = StyleSheet.create({})