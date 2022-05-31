import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const TabIcon = ({ focused, icon,title }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: focused ? COLORS.darkGreen : COLORS.lightLime,
        }}
      />
      <Text style = {{color:focused ? COLORS.darkGreen:COLORS.lightLime}}>
         {title}
      </Text>
      {focused && <View style = {styles.lineStyle}></View>}
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 50,
  },
  lineStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 5,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: COLORS.darkGreen
  },
});
