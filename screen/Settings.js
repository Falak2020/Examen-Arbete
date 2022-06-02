import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RecipeCard from "../componets/RecipeCard";
const Settings = ({ navigation }) => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
    // AsyncStorage.removeItem('LikedRecipes')
      AsyncStorage.getItem("LikedRecipes", (err, result) => {
        if (result != null) {
          const recipes = JSON.parse(result);
          setLikedRecipes(recipes);
        } else {
          console.log("first");
          setLikedRecipes([])
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  const renderRecipes = ({ item }) => {
    return (
      <RecipeCard
        recipe={item}
        onPress={() => { 
              navigation.navigate("StartPage", {
                screen: "Recipe",
                params: {
                  recipe: item,
                },
            });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={likedRecipes}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style= {styles.headerContainer}><Text style= {styles.headerText}>Dina favoriter</Text></View>}
        renderItem={renderRecipes}
        ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
      />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 30,
  },
  headerContainer: {
    
     alignItems: "center",
   },
   headerText: {
     fontSize: 30,
   
   },
});
