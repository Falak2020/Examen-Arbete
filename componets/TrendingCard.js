import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS, icons } from "../constants";
import { BlurView } from "expo-blur";
const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {

  const RecipeCardDetails = ({ recipeItem }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.nameContainerStyle}>
          <Text style={styles.nameStyle}>
              {recipeItem.name}
          </Text>
         {/*  <Image 
            source={recipeItem.isBookmark ? icons.bookmarkFilled: icons.bookmark}
            style={{
                width: 20,
                height: 20,
                marginRight: SIZES.base,
                tintColor: COLORS.darkGreen
            }}
          /> */}
        </View>
        <Text
          style = {{
              color: COLORS.lightGray,
              ...FONTS.body4
          }}
        >
            {recipeItem.bakeTime} min | {recipeItem.bakeTemperature} grader
        </Text>
      </View>
    );
  };
  const RecipeCardInfo = ({ recipeItem }) => {
    if (Platform.OS === "ios") {
      return (
        <BlurView
          intensity={90}
          tint="dark"
          style={styles.recipeCardInfoContainer}
        >
          <RecipeCardDetails recipeItem={recipeItem} />
        </BlurView>
      );
    } else {
      return (
        <View
          style={{
            ...styles.recipeCardInfoContainer,
            backgroundColor: COLORS.transparentDarkGray,
          }}
        >
          <RecipeCardDetails recipeItem={recipeItem} />
        </View>
      );
    }
  }; 
  return (
    <TouchableOpacity
      style={[styles.cardContainer, { ...containerStyle }]}
      onPress={onPress}
    >
      <Image
        source={{uri:recipeItem.imageURL}}
        resizeMode="cover"
        style={{
          width: 250,
          height: 350,
          borderRadius: SIZES.radius,
        }} 
      />
      {/**Category */}
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{recipeItem.category.name}</Text> 
      </View>
      {/**Card Info */}
     <RecipeCardInfo recipeItem={recipeItem} /> 
    </TouchableOpacity>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 350,
    width: 250,
    marginTop: SIZES.radius,
    marginRight: 20,
    borderRadius: SIZES.radius,
  },
  categoryContainer: {
    position: "absolute",
    top: 20,
    left: 15,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    backgroundColor: COLORS.transparentGray,
    borderRadius: SIZES.radius,
  },
  category: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  recipeCardInfoContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
  nameContainerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameStyle: {
    width: "100%",
    color: COLORS.white,
    ...FONTS.h3,
    fontSize: 18,
  },
});
