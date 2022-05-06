import { 
    StyleSheet,
    Text, 
    View, 
    Image,
    TouchableOpacity 
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";
const UserScreen = ({ navigation, route }) => {
  let user = route.params.userinfo;

  const renderUserProfilePic = () => {
    return (
      <View style={styles.profilePictureContainer}>
        <Image style={styles.profilePicture} source={{ uri: user.imageURL }} />
      </View>
    );
  };
  const renderUserName = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
      </View>
    );
  };
  const renderUserInfo = () => {
    return (
      <View style= {styles.userInfoContainer}>
          <View style = {styles.nameContainer}>
               <Text style = {styles.nameText1}>First Name: </Text>
               <Text style = {styles.nameText2}> {user.firstName}</Text> 
          </View>
          <View style = {styles.nameContainer}>
               <Text style = {styles.nameText1}>Last Name: </Text>
               <Text style = {styles.nameText2}> {user.lastName}</Text> 
          </View>
          <View style = {styles.nameContainer}>
               <Text style = {styles.nameText1}>Email: </Text>
               <Text style = {styles.nameText2}> {user.email}</Text> 
          </View>
          <View style = {styles.nameContainer}>
               <Text style = {styles.nameText1}>Date of birth: </Text>
               <Text style = {styles.nameText2}> 1983-03-15</Text> 
          </View>
      
        
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
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {renderUserProfilePic()}
      {renderUserName()} 
      {renderUserInfo()}
      {renderHeaderBar()}
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 30,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  profilePictureContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  headerContainer: {
    marginHorizontal: SIZES.padding,
    alignItems: "center",
    height: 80,
  },
  headerText: {
    fontSize: 30,
  },
  userInfoContainer: {
    marginTop:30
  },
  nameContainer:{
    paddingVertical:20,
    flexDirection:'row',
    alignItems:'center'
  },
  nameText1: {
    ...FONTS.h2,
    fontWeight:'bold'
  },
  nameText2: {
    ...FONTS.h2,
    fontWeight:'100'  
  },
  headerBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
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
});
