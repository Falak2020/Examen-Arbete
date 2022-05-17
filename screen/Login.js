import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from "react-native";
import React,{ useState,useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import {images, COLORS, SIZES, FONTS} from '../constants' 
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  const navigation = useNavigation()
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user=>{
       if(user){
           navigation.navigate('Start')
       }
   })
   return unsubscribe;
  }, [])
  
  const handleSignUp = () =>{
      auth
      .createUserWithEmailAndPassword(email,password)
      .then(userCredentials => {
          const user = userCredentials.user;
          console.log(user.email)
      })
      .catch(error=> console.log(error))
  }
  const handleLogin=()=>{
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials => {
        const user = userCredentials.user;
       
    })
    .catch(error=> console.log(error))
  }
  
  function renderHeader(){
      return(
        <View
         style= {{
           height:SIZES.height > 700 ? "60%" : "60%"
         }}
        >
          <ImageBackground
            source = {images.background}
            style = {{
                flex:1,
                justifyContent: 'flex-end'
            }}
            resizeMode = 'cover'
          >

          </ImageBackground>
        </View>  
      )
  }
  function renderForm(){
      return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Email" 
            style={styles.input}
            value={email} 
            onChangeText={(text)=>setEmail(text)}
          />
          <TextInput
            placeholder="password"
            style={styles.input}
            value={password} 
            onChangeText={(text)=>setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            onPress={handleSignUp} 
            style={[styles.button,styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      )
  }
  return (
 /**   <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Email" 
          style={styles.input}
          value={email} 
          onChangeText={(text)=>setEmail(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={password} 
          onChangeText={(text)=>setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleSignUp} 
          style={[styles.button,styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
 
   */
  <View
    style ={{
        flex:1,
        backgroundColor:COLORS.black,
       // justifyContent:'center',
    }}
  >
     <StatusBar barStyle="light-content" />
     {renderHeader()}
     {renderForm()}
  </View>
   );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width:'100%',
    justifyContent: "center",
   alignItems: "center",
  },
  inputContainer: {
    width:'80%',
  },
  input: {
    backgroundColor:'#FFFFFF',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    marginTop:5
  
  },
  buttonContainer:{
    width:'100%',
    justifyContent:'space-around',
    alignItems: 'center',
    marginTop:20,
    flexDirection:'row'
  },
  button: {
    backgroundColor:'blue',
    width:'30%',
    padding:15,
    borderRadius:10,
    alignItems:'center'
  },
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16
  },
  buttonOutline:{
    backgroundColor:'white',
    marginTop:5,
    borderColor:'blue',
    borderWidth:2
  },
  buttonOutlineText:{
    color:'blue',
    fontWeight:'700',
    fontSize:16
  }
});
