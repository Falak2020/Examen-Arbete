import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  
  return (

    <TouchableOpacity
      style={[styles.cardContainer, { ...containerStyle }]}
      onPress={onPress}
    >
      <Image
        source={{uri:categoryItem.imageURL}}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <View style={styles.detailsStyle}>
        <Text style={styles.categoryName}>{categoryItem.name}</Text>
        <Text style ={styles.recipecounter}> {categoryItem.recipeEntities.length} Recept</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray2,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius,
  },
  detailsStyle: {
    width: "65%",
    paddingHorizontal: 20,
  },
  categoryName: {
    ...FONTS.h2,
  },
  recipecounter:{
      color: COLORS.gray,
      ...FONTS.body4,
      marginTop:10
  }
});
