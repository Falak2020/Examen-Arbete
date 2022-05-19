import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RecipeCard from "../componets/RecipeCard";
const Settings = ({ navigation }) => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //AsyncStorage.removeItem('LikedRecipes')
      AsyncStorage.getItem("LikedRecipes", (err, result) => {
        if (result != null) {
          const recipes = JSON.parse(result);
          setLikedRecipes(recipes);
        } else {
          console.log("first");
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
          fetch(
            `https://recipe-myapi.azurewebsites.net/api/RecipeEntities/${item.id}`
          )
            .then((res) => res.json())
            .then((data) => {
              navigation.navigate("StartPage", {
                screen: "Recipe",
                params: {
                  recipe: data,
                },
              });
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
        ListHeaderComponent={<View></View>}
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
});
