import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "./screen/HomeScreen";
import Recipes from "./screen/Recipes";

import { TabIcon } from "./componets";
import Recipe from "./screen/Recipe";
import UserScreen from "./screen/UserScreen";
import Settings from "./screen/Settings";
import FilteredScreen from "./screen/FilteredScreen";
import Login from "./screen/Login";
import { SIZES, FONTS, COLORS, icons, images } from "./constants";
import { auth } from "./firebase";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const headerLeft = (navigation) => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>
    );
  };
  const handleSignout = (navigation) => {
    auth.signOut().then(() => {
      navigation.replace("login");
    });
  };

  const headerRight = (navigation) => {
    return (
      <TouchableOpacity onPress={()=>handleSignout(navigation)}>
        <AntDesign name={"logout"} color={COLORS.black} size={30} />
      </TouchableOpacity>
    );
  };
  function StartPage() {
    return (
      <Stack.Navigator
      initialRouteName="Home"
        screenOptions={({ navigation,route }) => ({
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: COLORS.darkGreen,
          },
          headerLeft: () =>route.name=='Home'?null: (headerLeft(navigation)) ,
          headerRight: () => (headerRight(navigation)),
          
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="FilteredScreen" component={FilteredScreen} />
      </Stack.Navigator>
    );
  }
  
  function LikedRecipes(){
    return (
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: COLORS.darkGreen,
          },
         
          
        })}
      >
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    );
  }
  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerTitle: "",
          tabBarIconStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: COLORS.white,
            borderTopColor: "transparent",
            height: 70,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="StartPage"
          component={StartPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} />
            ),
          }}
        />
        <Tab.Screen
          name="LikedRecipes"
          component={LikedRecipes}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.like_filled} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"login"}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Start" component={Tabs} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="FilteredScreen" component={FilteredScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
