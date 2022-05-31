
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
   
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { COLORS, FONTS, SIZES,icons } from "../constants";
  import RecipeCard from "../componets/RecipeCard";
  
  
  const VegetarianScreen = ({ navigation}) => {
   
    const [recipes, setRecipes] = useState([]);
    
  
    const getRecipes = () => {
        let categoryId = 4;
      fetch(
        `https://recipe-myapi.azurewebsites.net/api/CategoryEntities/${categoryId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data.recipeEntities);
        });
    };
  
  
   
  
    useEffect(() => {
     
      return getRecipes();
  
    }, []);
    
    
  
    const renderHeader = () => {
      return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Vegetariska recept</Text>
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
        
      </SafeAreaView>
    );
  };
  
  export default VegetarianScreen;
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
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
     // marginHorizontal: SIZES.padding,
      alignItems: "center",
    },
    headerText: {
      fontSize: 30,
    },
   
  });
  