import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { BlurView } from "expo-blur";

import { SIZES, FONTS, COLORS, icons } from "../constants";

const HEADER_HEIGHT = 350;
const RecipeCreatorCardDetail = ({ selectedRecipe }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={styles.profilePictureContainer}>
        {/* <Image
          source={selectedRecipe?.author?.profilePic}
          style={styles.profilePicture}
        /> */}
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          Recipe by:
        </Text>
        <Text
          style={{
            color: COLORS.white2,
            ...FONTS.h3,
          }}
        >
          {/*  {selectedRecipe?.author?.name} */}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.arrowButtonContainer}
        onPress={() => {
          console.log("View Profil");
        }}
      >
        <Image source={icons.rightArrow} style={styles.arrowButton} />
      </TouchableOpacity>
    </View>
  );
};
const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView
        intensity={90}
        tint="dark"
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
        }}
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.transparentBlack9,
        }}
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </View>
    );
  }
};
const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);

  const renderRecipeCardHeader = () => {
    return (
      <View
        style={{
          marginTop: -1000,
          paddingTop: 1000,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Animated.Image
          source={{ uri: selectedRecipe?.imageURL }}
          resizeMode="contain"
          style={[
            styles.headerImage,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                  }),
                },
                {
                  scale: scrollY.interpolate({
                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                    outputRange: [2, 1, 0.75],
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={{
            position: "absolute",
            bottom: 10,
            left: 30,
            right: 30,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
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
        <TouchableOpacity style={styles.bookMark}>
          {/*  <Image
            source={
              selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark
            }
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.darkGreen,
            }}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }

  function renderRecipeInfo() {
    return (
      <View style={styles.recipeInfoContainer}>
        <View
          style={{
            flex: 1.5,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
            }}
          >
            {selectedRecipe?.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: COLORS.lightGray2,
              ...FONTS.body4,
            }}
          >
            {selectedRecipe?.duration} | {selectedRecipe?.serving} Serving
          </Text>
        </View>
      </View>
    );
  }

  function renderIngredientHeader() {
    return (
      <View style={styles.IngHeaderContainer}>
        <Text style={styles.ingredientsTitle}>ingredients</Text>
        <Text style={styles.ingredientsCount}>
          {selectedRecipe?.ingredients.length} items
        </Text>
      </View>
    );
  }

  function renderinstruction(instructions) {
    console.log(instructions);
    return (
      <View>
        <Text>{instructions}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.recipeIngredients}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* header */}
            {renderRecipeCardHeader()}
            {/* Info */}
            {/*  {renderRecipeInfo()} */}
            {/* Ingredient Titel */}
            {/*   {renderIngredientHeader()} */}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 50,
            }}
          >
            <View style={styles.ingredientsContainer}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.ingredient.name}</Text>
              </View>
              {item.ingredient.amount != 0 ? (
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantity}>{item.ingredient.amount}</Text>
                  <Text style={styles.unite}>
                    {item.ingredient.unitOfMeasure.name}
                  </Text>
                </View>
              ) : undefined}
            </View>
          </View>
        )}
        ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
      />
      {/* {renderinstruction(selectedRecipe?.instructions)} */}
      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  ingredientsContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.2,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  description: {
    ...FONTS.body3,
  },
  quantityContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  quantity: {
    ...FONTS.body3,
  },
  unite: {
    marginLeft: 5,
  },
  headerImage: {
    height: HEADER_HEIGHT,
    width: "200%",
  },
  profilePictureContainer: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  arrowButtonContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGreen1,
  },
  arrowButton: {
    width: 15,
    height: 15,
    tintColor: COLORS.lightGreen1,
  },
  headerBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
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
  bookMark: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 25,
  },
  recipeInfoContainer: {
    flexDirection: "row",
    height: 130,
    width: SIZES.width,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
  },
  IngHeaderContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  ingredientsTitle: {
    flex: 1,
    ...FONTS.h3,
  },
  ingredientsCount: {
    color: COLORS.lightGray2,
    ...FONTS.body4,
  },
});
