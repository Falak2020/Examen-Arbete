import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { AntDesign } from '@expo/vector-icons';

import { CategoryCard, TrendingCard } from "../componets";
import { FONTS, COLORS, SIZES, icons, images } from "../constants";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [catgories, setCategories] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);

  const search = useRef();
  const [searchVal, setSearchVal] = useState("");

  const handleSignout = () => {
    auth.signOut().then(() => {
      navigation.replace("login");
    });
  };

  const getTrendingRecipe = () => {
    fetch("https://recipe-myapi.azurewebsites.net/api/RecipeEntities")
      .then((res) => res.json())
      .then((data) => {
        setTrendingRecipes(data);
      })
      .catch((err) => console.log(err));
  };
  const getCategories = () => {
    fetch("https://recipe-myapi.azurewebsites.net/api/CategoryEntities")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  useEffect(() => {
    
    const unsubscribe = navigation.addListener("focus", () => {
      getTrendingRecipe();
      getCategories();
      setSearchVal("");
    });
    return unsubscribe;
   
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <CategoryCard
        containerStyle={{
          marginHorizontal: SIZES.padding,
        }}
        categoryItem={item}
        onPress={() =>
          navigation.navigate("Recipes", {
            id: item.id,
            name: item.name,
          })
        }
      />
    );
  };

  const renderHeader = () => {
    let index = auth.currentUser?.email.indexOf("@");
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerView}>
          <Text style={styles.welcomeText}>
            Hello,{auth.currentUser?.email.substr(0, index)}
          </Text>
          <Text style={styles.questionText}>Vad vill du laga idag?</Text>
        </View>
        
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainr}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          style={styles.searchText}
          placeholderTextColor={COLORS.gray}
          placeholder="Sök Recept"
          ref={search}
          value={searchVal}
          onChangeText={(text) => {
            setSearchVal(text);
          }}
          returnKeyType="go"
          onSubmitEditing={() => {
            navigation.navigate("FilteredScreen", {
              searchKey: searchVal,
            });
          }}
        />
      </View>
    );
  };

  const renderSeeRecipeCard = () => {
    return (
      <View style={styles.recipeCard}>
        <View style={styles.imageContainer}>
          <Image source={images.recipe} style={styles.image} />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>
            Har du inte mycket tid och vill inta tillbringa din tid i köket
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            onPress={() => navigation.navigate("Recipes",{
              id : -1,
              name : 'Enkla Recept'
            })}
          >
            <Text style={styles.seeRecipeText}>Kolla snappa recipes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTrendingSection = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
          }}
        >
          Trendiga recept
        </Text>
        <FlatList
          data={trendingRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TrendingCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 0,
                }}
                recipeItem={item}
                onPress={() => navigation.navigate("Recipe", { recipe: item })}
              />
            );
          }}
        />
      </View>
    );
  };

  const renderCategoryHeader = () => {
    return (
      <View style={styles.categoryHeaderContainer}>
        <Text style={styles.categoryHeader}>Categories</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Recipes", {
              id: 0,
              name: 'Alla recept',
            });
          }}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={catgories}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {renderSearchBar()}
            {renderSeeRecipeCard()}
            {renderTrendingSection()}
            {renderCategoryHeader()}
          </View>
        }
        renderItem={renderItem}
        ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
      />
      <View></View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: SIZES.padding,
    alignItems: "center",
    height: 80,
    marginTop:10
  },
  headerView: {
    flex: 1,
  },
  welcomeText: {
    color: COLORS.darkGreen,
    ...FONTS.h2,
  },
  questionText: {
    marginTop: 3,
    color: COLORS.gray,
    ...FONTS.body3,
  },
  logout: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  searchContainr: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  searchText: {
    marginLeft: SIZES.radius,
    ...FONTS.body3,
  },
  recipeCard: {
    flexDirection: "row",
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
  },
  imageContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  cardTextContainer: {
    flex: 1,
    paddingVertical: SIZES.radius,
  },
  cardText: {
    width: "70%",
    ...FONTS.body4,
  },
  seeRecipeText: {
    color: COLORS.darkGreen,
    textDecorationLine: "underline",
    ...FONTS.h4,
  },
  categoryHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  categoryHeader: {
    flex: 1,
    ...FONTS.h2,
  },
  viewAll: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
});
