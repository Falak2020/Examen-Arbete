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
import { CategoryCard, TrendingCard } from "../componets";
import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";

const HomeScreen = ({ navigation }) => {
  const [catgories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCategories = () => {
    setLoading(true);
    fetch("https://localhost:44348/api/CategoryEntities")
      .then((res) => res.json())
      .then((data) => {
        console.log("data");
        console.log(data);
        setCategories(data);
        setLoading(false);
      });
  };
  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;
    fetch("http://10.0.2.2:44348/api/CategoryEntities")
      .then((res) => res.json())
      .then((data) => {
        console.log('first')
        console.log(data)
        if (isRendered) 
          setCategories(data);
        return null
      })
      .catch((err)=>console.log(err))

    return () => {
      isRendered = false;
    };
  }, []);

  
  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <CategoryCard
        containerStyle={{
          marginHorizontal: SIZES.padding,
        }}
        categoryItem={item}
        onPress={() => navigation.navigate("Recipe", { recipe: item })}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerView}>
          <Text style={styles.welcomeText}>Hello,Falak</Text>
          <Text style={styles.questionText}>Vad vill du laga idag?</Text>
        </View>
        {/** Profile*/}
        <TouchableOpacity onPress={() => console.log("profile")}>
          <Image source={images.profile} style={styles.profile} />
        </TouchableOpacity>
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
            you have 12 recipes that you havenot tried yet
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            onPress={() => console.log("see Recipe")}
          >
            <Text style={styles.seeRecipeText}>See Recipes</Text>
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
          Trending Recipe
        </Text>
        <FlatList
          data={dummyData.trendingRecipes}
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
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
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
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: SIZES.padding,
    alignItems: "center",
    height: 80,
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
  profile: {
    width: 40,
    height: 40,
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
