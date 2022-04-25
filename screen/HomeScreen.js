import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { CategoryCard } from "../componets";
import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";
import { TextInput } from "react-native-web";

const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
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

  const renderSearchBar =()=>{
      return(
          <View
           style={styles.searchContainr}
          >
            <Image 
              source={icons.search}
              style={styles.searchIcon}
            />
            <TextInput 
              style={styles.searchText}
              placeholderTextColor={COLORS.gray}
              placeholder= 'Sök Recept'
            />
          </View>
      )
  }
  return (
    <SafeAreaView>
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
              {renderHeader()}
              {renderSearchBar()}
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
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      marginHorizontal: SIZES.padding,
      paddingHorizontal: SIZES.radius,
      borderRadius: 10,
      backgroundColor : COLORS.lightGray
  },
  searchIcon:{
      width: 20,
      height: 20,
      tintColor: COLORS.gray
  },
  searchText:{
      marginLeft: SIZES.radius,
      ...FONTS.body3
  }
});
