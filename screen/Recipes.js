import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES,icons } from "../constants";

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity 
       onPress={onPress} 
       style={styles.cardContainer}>
      <Image
        source={{ uri: recipe.imageURL }}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <View style={styles.detailsStyle}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.bakeTime}>
        {recipe.bakeTime} min| {recipe.bakeTemperature}&deg;
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Recipes = ({ navigation, route }) => {
  let categoryId = route.params.id;
  let categoryName = route.params.name;
  const [recipes, setRecipes] = useState([]);
  const getRecipes = (categoryId) => {
    fetch(
      `https://recipe-myapi.azurewebsites.net/api/CategoryEntities/${categoryId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipeEntities);
      });
  };

  useEffect(() => {
    getRecipes(categoryId);
  }, []);
  
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

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{categoryName}</Text>
        </View>
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
        data={recipes}
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

export default Recipes;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 30,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray2,
  },
  detailsStyle: {
    width: "65%",
    paddingHorizontal: 20,
  },
  recipeName: {
    flex: 1,
    ...FONTS.h2,
  },
  bakeTime: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius,
  },
  headerContainer: {
    marginHorizontal: SIZES.padding,
    alignItems: "center",
    height: 80,
  },
  headerText: {
    fontSize: 30,
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
