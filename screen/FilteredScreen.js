import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import RecipeCard from "../componets/RecipeCard";
import { COLORS, FONTS, SIZES,icons } from "../constants";

const FilteredScreen = ({ navigation, route }) => {
  let searchKey = route.params.searchKey;
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetch(`https://recipe-myapi.azurewebsites.net/api/RecipeEntities`)
      .then((res) => res.json())
      .then((data) => {
        setFilter(
          data.filter((recipe) => recipe.name.toLowerCase().match(searchKey.toLowerCase()))
        );
      });

    return () => {};
  }, []);
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Du har fått {filter.length} recept i din sökning</Text>
      </View>
    );
  };
 
  const renderRecipes = ({ item }) => {
    return (
      <RecipeCard 
         recipe={item} 
         onPress={() =>{
          fetch(
            `https://recipe-myapi.azurewebsites.net/api/RecipeEntities/${item.id}`
          )
            .then((res) => res.json())
            .then((data) => {
              navigation.navigate("Recipe", { recipe: data })
            });
         }} />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filter}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View>{renderHeader()}</View>}
        renderItem={renderRecipes}
        ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
      />
     

    </SafeAreaView>
  );
};

export default FilteredScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 30,
  },
  headerContainer:{
   marginBottom:10
  },
  headerBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: SIZES.padding,
    paddingBottom: 10,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.transparentBlack5,
  },
  backIcon: {
    width: 15,
    height: 15,
    tintColor: COLORS.lightGray,
  },
});
