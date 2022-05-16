import React, { useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screen/HomeScreen";
import Recipes from "./screen/Recipes";
import { COLORS, icons } from "./constants";
import { TabIcon } from "./componets";
import Recipe from "./screen/Recipe";
import UserScreen from "./screen/UserScreen";
import Settings from "./screen/Settings";
import FilteredScreen from "./screen/FilteredScreen";
import Login from "./screen/Login";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  
 

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
            height: 100,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.settings} />
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
        <Stack.Screen name="FilteredScreen" component={FilteredScreen}/>


      </Stack.Navigator>
    </NavigationContainer>

    /**  <View>
    

  <Pressable onPress={() =>fetchApi()}>
    <Text>hhhhh</Text>
  </Pressable>
    
  </View>
*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
