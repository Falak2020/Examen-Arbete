import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  Share,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { BlurView } from "expo-blur";

import AsyncStorage from "@react-native-async-storage/async-storage";
 
import { SIZES, FONTS, COLORS, icons, images } from "../constants";

const HEADER_HEIGHT = 350;

 
const onShare = async (selectedRecipe) => {
  try {
    const result = await Share.share({
      message: selectedRecipe.name,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
const RecipeCreatorCardDetail = ({ selectedRecipe, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: selectedRecipe?.user?.imageURL }}
          style={styles.profilePicture}
        />
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
          {selectedRecipe?.user?.firstName} {selectedRecipe?.user?.lastName}
        </Text>
      </View>

      {/*  View Prfile */}

      <TouchableOpacity
        style={styles.arrowButtonContainer}
        onPress={() => {
          navigation.navigate("User", { userinfo: selectedRecipe?.user });
        }}
      >
        <Image source={icons.rightArrow} style={styles.arrowButton} />
      </TouchableOpacity>
    </View>
  );
};
const RecipeCreatorCardInfo = ({ selectedRecipe, navigation }) => {
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
        <RecipeCreatorCardDetail
          selectedRecipe={selectedRecipe}
          navigation={navigation}
        />
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
        <RecipeCreatorCardDetail
          selectedRecipe={selectedRecipe}
          navigation={navigation}
        />
      </View>
    );
  }
};

const InstructionDetail = ({ instruction, num }) => {
  return (
    <View style={styles.instructionContainer}>
      <Text style={styles.instruction}>
        {num + 1}.{instruction}
      </Text>
    </View>
  );
};
const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isedit, setIsEdit] = useState(false);
  
  let Array = selectedRecipe?.instructions.split(".");
  
  let instructionsArry = Array?.filter(instruction=>instruction.length>0)

  ///////////////////////////////
  useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);

  


 
  const editRecipe = () => {
    selectedRecipe.isliked = !selectedRecipe.isliked;
   
    fetch(
      `https://recipe-myapi.azurewebsites.net/api/RecipeEntities/${selectedRecipe.id}/1`
    ).then((res) => {
      if (res.status == "204") setIsEdit(!isedit);
      AsyncStorage.getItem('LikedRecipes', (err, result) => {
        if (result != null) {
          let store = JSON.parse(result);
          let index = store.findIndex(item=>item.id==selectedRecipe.id)
          console.log(index)
          if(index == -1){
            let likedRecipes = [...store,selectedRecipe];
            AsyncStorage.setItem('LikedRecipes',JSON.stringify(likedRecipes));
          }
          else{
            let likedRecipes = store.filter(item=>item.id != selectedRecipe.id)
            AsyncStorage.setItem('LikedRecipes',JSON.stringify(likedRecipes));
          }
          
        }
        else{
          console.log('ss')
          const likedRecipes = [selectedRecipe];
          AsyncStorage.setItem('LikedRecipes',JSON.stringify(likedRecipes));
        }
      })
     
    });

  };
 
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
          <RecipeCreatorCardInfo
            selectedRecipe={selectedRecipe}
            navigation={navigation}
          />
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
        {/**Share icon */}
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 35,
            width: 35,
          }}
          onPress={() => onShare(selectedRecipe)}
        >
          <Image source={images.share} style={styles.share} />
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
          <View style={styles.likeContainer}>
            <Text
              style={{
                ...FONTS.h2,
              }}
            >
              {selectedRecipe?.name}
            </Text>
            {/**Share icon */}
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 35,
                width: 35,
              }}
              onPress={()=>{onShare(selectedRecipe)}}
            >
              <Image source={images.share} style={styles.share} />
            </TouchableOpacity>
            {/**Like section */}
            <TouchableOpacity
              style={styles.likeIcon}
              onPress={() => editRecipe()}
            >
              <Image
                source={
                  selectedRecipe?.isliked ? icons.like_filled : icons.like
                }
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.darkGreen,
                }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginTop: 5,
              color: COLORS.lightGray2,
              ...FONTS.body4,
            }}
          >
            {selectedRecipe?.bakeTime} min | {selectedRecipe?.bakeTemperature}&deg; 
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
          {selectedRecipe?.recipeIngredients.length} items
        </Text>
      </View>
    );
  }
  function renderInstructionsHeader() {
    return (
      <View style={styles.IngHeaderContainer}>
        <Text style={styles.ingredientsTitle}>Instructions</Text>
      </View>
    );
  }

  function renderinstruction() {
    return (
      <View>
        {instructionsArry?.map((instruction, index) => {
          return (
            <InstructionDetail
              key={index}
              instruction={instruction}
              num={index}
            />
          );
        })}
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        
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
            {renderRecipeInfo()}
            {/* Ingredient Titel */}
            {renderIngredientHeader()}
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
        ListFooterComponent={
          <View style={{ marginBottom: 100 }}>
            {renderInstructionsHeader()}
            {renderinstruction()}
          </View>
        }
      />
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
    borderBottomWidth: 0.5,
    alignItems: "center",
    paddingVertical: 20,
  },
  descriptionContainer: {
    flex: 1,
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
  share: {
    height: 36,
    width: 30,
    tintColor: COLORS.darkGreen,
  },
  likeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeIcon: {
    marginRight: 4,
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
    paddingVertical: 10,
    marginTop: SIZES.radius,
    marginBottom: 10,
    backgroundColor: COLORS.lightLime,
  },
  ingredientsTitle: {
    flex: 1,
    ...FONTS.h2,
  },
  ingredientsCount: {
    color: COLORS.lightGray2,
    ...FONTS.body4,
  },
  instructionContainer: {
    marginLeft: 30,
    flexDirection: "row",
    paddingVertical: 10,
  },
  instruction: {
    ...FONTS.body3,
  },
});
