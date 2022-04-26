import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  Animated,
  Platform 
} from 'react-native';
import React,{ useRef, useState, useEffect } from 'react';
import { BlurView } from "expo-blur";

import { SIZES, FONTS, COLORS, icons} from '../constants';


const HEADER_HEIGHT =350;

const Recipe = ({ navigation, route }) => {

  const [selectedRecipe,setSelectedRecipe] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, [])
  
  return (
    <View 
      style={{
        flex: 1,
        backgroundColor:COLORS.white
      }}
    >
      <Animated.FlatList 
         data={selectedRecipe?.ingredients}
         keyExtractor={item => `${item.id}`}
         showsVerticalScrollIndicator ={false}
         ListHeaderComponent={
           <View></View>
         }
         scrollEventThrottle={16}

         onScroll={Animated.event([
           {nativeEvent:{ contentOffset:{y:scrollY}}}
         ],{useNativeDriver: true})}
         renderItem = {({item})=>(
           <View
             style={{
               flexDirection:'row',
               paddingHorizontal:30,
               marginVertical:5
             }}
           >
             <View style ={styles.icon}>
               <Image 
                 source={item.icon}
                 style ={{
                   height:40,
                   width:40
                 }}
               />
             </View>
             <View style ={styles.descriptionContainer}>
               <Text style = {styles.description}>
                 {item.description}
               </Text>
             </View>
             
             <View style ={styles.quantityContainer}>
               <Text style = {styles.quantity}>
                 {item.quantity}
                </Text>
             </View>
           </View>
         )}
      />
    </View>
  )
}

export default Recipe

const styles = StyleSheet.create({

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray
  },
  descriptionContainer:{
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  description:{
    ...FONTS.body3
  },
  quantityContainer:{
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  quantity: {
    ...FONTS.body3
  }
})