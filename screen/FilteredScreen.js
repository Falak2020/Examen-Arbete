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
          data.filter((recipe) => recipe.name.toLowerCase().match(searchKey))
        );
      });

    return () => {};
  }, []);
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Du har fått {filter.length} recept i din sökning</Text>
        </View>
      </View>
    );
  };
  function renderHeaderBar() {
    return (
      <View style={styles.headerBarContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
    );
  }
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
      {renderHeaderBar()}

    </SafeAreaView>
  );
};

export default FilteredScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 30,
  },
  headerContainer:{
    margin:20,
    marginLeft:40
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
