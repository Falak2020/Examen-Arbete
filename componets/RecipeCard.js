import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES,icons } from "../constants";
const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.cardContainer,styles.elevation]}>
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

export default RecipeCard;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
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
      recipeName: {
        flex: 1,
        ...FONTS.h2,
      },
      bakeTime: {
        color: COLORS.gray,
        ...FONTS.body4,
      },
      elevation: {
        elevation: 10,
        shadowColor: '#171717',
      },
});
