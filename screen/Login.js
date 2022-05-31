import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { images, COLORS, SIZES, FONTS } from "../constants";
import { setSignIn } from '../store/actions'
import { useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();


  var formData = new FormData();
  formData.append('FirstName', 'email');
  formData.append('LastName',' email');
  formData.append('Email', email);
  formData.append('password', password);
 
 const Register =()=>{

   fetch("https://recipe-myapi.azurewebsites.net/api/User/register", {
      method: 'POST',
      body: formData,

      headers: {
          'Content-Type': 'multipart/form-data',
      }
  }).then(res=>console.log(res.status))
 }
  
 const Login = () =>{
  fetch("https://recipe-myapi.azurewebsites.net/api/User/LogIn", {
    method: 'POST',
    body: formData,

    headers: {
        'Content-Type': 'multipart/form-data',
    }
}).then(res=>res.json())
  .then(data =>{dispatch(setSignIn(true))})
 }
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Start");
      }
      else{
        AsyncStorage.getItem("user", (err, result) => {
          if (result != null) {
            const user = JSON.parse(result);
           console.log(user)
          }
        });
      }
    });
    return unsubscribe;
  }, []);
 
  const resetForm = () =>{
     setEmail('');
     setPassword('');
  };
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        AsyncStorage.setItem('user',JSON.stringify(user));
      })
      .catch((error) =>Alert.alert(
        'Error',
        error.toString(),
        [
            { text: "Ok", style: 'destructive', onPress: () => resetForm()},
           
        ]
    ));
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        AsyncStorage.setItem('user',JSON.stringify(user));
        console.log(user)
      })
      .catch((error) => Alert.alert(
        'Error',
        error.toString(),
        [
            { text: "Ok", style: 'destructive', onPress: () => resetForm()},
           
        ]
    ));
  };

  function renderHeader() {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? "60%" : "60%",
        }}
      >
        <ImageBackground
          source={images.background}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        ></ImageBackground>
      </View>
    );
  }
  function renderForm() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="password"
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  return (
   
    <View
      style={{
        flex: 1,
        backgroundColor:COLORS.green,
        
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  button: {
    backgroundColor: COLORS.darkGreen,
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: COLORS.darkGreen,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: COLORS.darkGreen,
    fontWeight: "700",
    fontSize: 16,
  },
});
